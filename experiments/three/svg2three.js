// EXPERIMENTAL: draw a scene's SVG art (characters, props, ground, foliage…) with three.js instead of the browser's SVG painter.
// The SVG stays in the page, hidden, so reel.js's GSAP timeline keeps computing every motion (bob, blink, talk, sway, camera
// moves, parallax, hand-held, entrances); each frame we copy the animated groups' transforms/opacity onto three.js objects.
//   mode 'vec'    : static shapes become real three.js meshes (SVGLoader paths/strokes); gradients -> canvas textures;
//                   blurred parts (filter=…) are rasterized once.
//   mode 'sprite' : every static run of shapes is rasterized once by Chrome into a texture (cut-out puppet, Spine/Live2D-like).
import * as THREE from './three.module.min.js';
import { SVGLoader } from './SVGLoader.js';

const SVGNS = 'http://www.w3.org/2000/svg';
const ANIM = ['data-bob', 'data-sway', 'data-spin', 'data-pulse', 'data-flick', 'data-flap', 'data-drift', 'data-scroll', 'data-in', 'data-tw', 'data-blink', 'data-talk', 'data-depth'];
const SEL = ANIM.map((a) => `[${a}]`).join(',') + ',.cam,.hh';
const isAnim = (el) => el.matches(SEL);
const SHAPES = new Set(['path', 'circle', 'ellipse', 'rect', 'polygon', 'polyline', 'line']);
const GEO = { path: ['d'], circle: ['cx', 'cy', 'r'], ellipse: ['cx', 'cy', 'rx', 'ry'], rect: ['x', 'y', 'width', 'height', 'rx', 'ry'],
  polygon: ['points'], polyline: ['points'], line: ['x1', 'y1', 'x2', 'y2'] };
const loader = new SVGLoader();
const geoCache = new Map();

function matOf(el) {   // the element's own transform as a THREE.Matrix4 (2D affine)
  const t = el.transform?.baseVal?.consolidate?.();
  const m = new THREE.Matrix4();
  if (t) { const { a, b, c, d, e, f } = t.matrix; m.set(a, c, 0, e, b, d, 0, f, 0, 0, 1, 0, 0, 0, 0, 1); }
  return m;
}
const ownOpacity = (el) => { const s = el.style?.opacity; return s !== '' && s != null ? +s : el.hasAttribute('opacity') ? +el.getAttribute('opacity') : 1; };

function shapePath(el) {   // parse just the geometry of one shape element (cached)
  const tag = el.tagName.toLowerCase(), attrs = GEO[tag].filter((a) => el.hasAttribute(a)).map((a) => `${a}="${el.getAttribute(a)}"`).join(' ');
  const key = tag + ' ' + attrs;
  if (!geoCache.has(key)) geoCache.set(key, loader.parse(`<svg xmlns="${SVGNS}"><${tag} ${attrs}/></svg>`).paths[0] || null);
  return geoCache.get(key);
}

function gradientTexture(id) {   // a 256² canvas painted with the referenced gradient in objectBoundingBox units
  const g = document.getElementById(id);
  if (!g) return null;
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  const pct = (v, d) => (v == null ? d : v.endsWith('%') ? parseFloat(v) / 100 : +v);
  let gr;
  if (g.tagName === 'radialGradient') {
    const cx = pct(g.getAttribute('cx'), 0.5), cy = pct(g.getAttribute('cy'), 0.5), r = pct(g.getAttribute('r'), 0.5);
    gr = x.createRadialGradient(cx * 256, cy * 256, 0, cx * 256, cy * 256, r * 256);
  } else {
    gr = x.createLinearGradient(pct(g.getAttribute('x1'), 0) * 256, pct(g.getAttribute('y1'), 0) * 256, pct(g.getAttribute('x2'), 1) * 256, pct(g.getAttribute('y2'), 0) * 256);
  }
  for (const s of g.querySelectorAll('stop')) {
    const col = new THREE.Color(s.getAttribute('stop-color') || '#000'), op = s.hasAttribute('stop-opacity') ? +s.getAttribute('stop-opacity') : 1;
    gr.addColorStop(+s.getAttribute('offset'), `rgba(${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)},${op})`);
  }
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; return t;
}
const gradCache = new Map();
const gradTex = (id) => { if (!gradCache.has(id)) gradCache.set(id, gradientTexture(id)); return gradCache.get(id); };

function bboxUV(geo) {   // texture coordinates 0..1 over the geometry's bounding box (objectBoundingBox gradients)
  geo.computeBoundingBox(); const b = geo.boundingBox, p = geo.attributes.position, uv = new Float32Array(p.count * 2);
  const w = b.max.x - b.min.x || 1, h = b.max.y - b.min.y || 1;
  for (let i = 0; i < p.count; i++) { uv[2 * i] = (p.getX(i) - b.min.x) / w; uv[2 * i + 1] = (p.getY(i) - b.min.y) / h; }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

const basicMat = (o) => new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide, ...o });

export function convert(svg, cam, { mode = 'vec', defs = '', zoom = 1.15, maxTex = 4096 } = {}) {
  const root = new THREE.Group(); root.scale.y = -1;   // SVG y-down -> world y-up (ortho camera 0..1080 × 0..-1920)
  const tracked = [];   // [el, node]
  const jobs = [];      // pending rasterizations
  let order = 0, stats = { meshes: 0, rasters: 0, rasterPx: 0, nodes: 0 };

  const addMesh = (parent, geo, mat, baseOp) => {
    const m = new THREE.Mesh(geo, mat); m.renderOrder = order++; m.userData.baseOp = baseOp; parent.add(m); stats.meshes++; return m;
  };

  // vector meshes for one static shape element (fill + stroke)
  function vecShape(el, parent, inhOp) {
    const cs = getComputedStyle(el), sp = shapePath(el);
    if (!sp) return;
    const node = new THREE.Group(); node.matrixAutoUpdate = false; node.matrix.copy(matOf(el)); parent.add(node);
    const op = inhOp * +cs.opacity;
    if (cs.fill && cs.fill !== 'none') {
      const shapes = SVGLoader.createShapes(sp);
      if (shapes.length) {
        const geo = new THREE.ShapeGeometry(shapes, 24), fo = op * +cs.fillOpacity;
        const url = cs.fill.match(/url\("?#([^")]+)"?\)/);
        if (url) { bboxUV(geo); addMesh(node, geo, basicMat({ map: gradTex(url[1]), opacity: fo }), fo); }
        else addMesh(node, geo, basicMat({ color: new THREE.Color(cs.fill), opacity: fo }), fo);
      }
    }
    if (cs.stroke && cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0) {
      const style = SVGLoader.getStrokeStyle(parseFloat(cs.strokeWidth), cs.stroke, cs.strokeLinejoin, cs.strokeLinecap, 4);
      const geos = sp.subPaths.map((s) => SVGLoader.pointsToStroke(s.getPoints(24), style)).filter(Boolean);
      const so = op * +cs.strokeOpacity;
      for (const g of geos) addMesh(node, g, basicMat({ color: new THREE.Color(cs.stroke), opacity: so }), so);
    }
  }
  function vecStatic(el, parent, inhOp) {
    const tag = el.tagName.toLowerCase();
    if (SHAPES.has(tag)) return vecShape(el, parent, inhOp);
    if (tag !== 'g') return;
    const node = new THREE.Group(); node.matrixAutoUpdate = false; node.matrix.copy(matOf(el)); parent.add(node);
    const op = inhOp * ownOpacity(el);   // group opacity approximated per shape (overlaps inside a faded group show through)
    for (const ch of el.children) vecStatic(ch, node, op);
  }

  // rasterize a run of static sibling elements (in their parent's user space) into one textured quad
  function raster(els, parent, filter) {
    const pEl = els[0].parentNode;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, blur = filter ? 40 : 0;
    for (const el of els) {
      let b; try { b = el.getBBox(); } catch { continue; }
      if (!b.width && !b.height) continue;
      if (el.querySelector?.('[filter]') || el.hasAttribute('filter')) blur = 40;
      const m = matOf(el);
      for (const [px, py] of [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]) {
        const v = new THREE.Vector3(px, py, 0).applyMatrix4(m);
        x0 = Math.min(x0, v.x); y0 = Math.min(y0, v.y); x1 = Math.max(x1, v.x); y1 = Math.max(y1, v.y);
      }
      // strokes poke out of the geometric bbox
      blur = Math.max(blur, 8);
    }
    if (!isFinite(x0)) return;
    x0 -= blur; y0 -= blur; x1 += blur; y1 += blur;
    const ctm = pEl.getCTM?.() || { a: 1, b: 0 }, k = Math.hypot(ctm.a, ctm.b) * zoom;
    const bw = x1 - x0, bh = y1 - y0;
    const tw = Math.max(2, Math.min(maxTex, Math.ceil(bw * k))), th = Math.max(2, Math.min(maxTex, Math.ceil(bh * k)));
    const body = els.map((e) => e.outerHTML).join('');
    const src = `<svg xmlns="${SVGNS}" width="${tw}" height="${th}" viewBox="${x0} ${y0} ${bw} ${bh}" preserveAspectRatio="none">${defs}`
      + (filter ? `<g filter="${filter}">${body}</g>` : body) + '</svg>';
    const geo = new THREE.PlaneGeometry(bw, bh); geo.translate(x0 + bw / 2, y0 + bh / 2, 0);
    const mat = basicMat({ premultipliedAlpha: true, opacity: 1 });
    addMesh(parent, geo, mat, 1);
    stats.rasters++; stats.rasterPx += tw * th;
    jobs.push((async () => {
      const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src);
      await img.decode();
      const c = document.createElement('canvas'); c.width = tw; c.height = th; c.getContext('2d').drawImage(img, 0, 0, tw, th);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; t.premultiplyAlpha = false;   // straight alpha in, the shader premultiplies (premultipliedAlpha material)
      t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; mat.map = t; mat.needsUpdate = true;
    })());
  }

  // walk: animated groups become tracked nodes; static runs become vectors or rasters
  function walk(el, parent, inhFilter) {
    const node = new THREE.Group(); node.matrixAutoUpdate = false; node.matrix.copy(matOf(el)); parent.add(node); stats.nodes++;
    node.userData.op = ownOpacity(el);
    if (isAnim(el)) tracked.push([el, node]);
    const filter = el.getAttribute('filter') || inhFilter;   // a filter on an animated ancestor is pushed down to the static parts
    const tag = el.tagName.toLowerCase();
    if (SHAPES.has(tag)) {   // an animated shape (e.g. a twinkling mote): its own geometry, without its transform/opacity
      const c = el.cloneNode(false); c.removeAttribute('transform'); c.removeAttribute('opacity'); c.removeAttribute('style');
      for (const a of ANIM) c.removeAttribute(a);
      const tmp = document.createElementNS(SVGNS, 'g'); el.parentNode.insertBefore(tmp, el); tmp.appendChild(c);
      if (mode === 'sprite' || filter || el.hasAttribute('filter')) raster([c], node, filter); else vecStatic(c, node, 1);
      tmp.remove();
      return;
    }
    let run = [];
    const flush = () => {
      if (!run.length) return;
      if (mode === 'sprite' || filter) raster(run, node, filter);
      else for (const s of run) { if (s.querySelector?.('[filter]') || s.hasAttribute('filter')) raster([s], node, null); else vecStatic(s, node, 1); }
      run = [];
    };
    for (const ch of el.children) {
      const t = ch.tagName.toLowerCase();
      if (t === 'defs' || t === 'title' || t === 'desc') continue;
      if (isAnim(ch) || ch.querySelector(SEL)) { flush(); walk(ch, node, filter); }
      else run.push(ch);
    }
    flush();
  }

  walk(cam, root, null);

  // per frame: copy GSAP's current transforms/opacity from the hidden SVG, then propagate group opacity to the meshes
  function sync() {
    for (const [el, node] of tracked) { node.matrix.copy(matOf(el)); node.userData.op = ownOpacity(el); }
    const prop = (o, acc) => {
      if (o.isMesh) { o.material.opacity = o.userData.baseOp * acc; o.visible = o.material.opacity > 0.002; return; }
      const a = acc * (o.userData.op ?? 1); o.visible = a > 0.002;
      if (o.visible) for (const ch of o.children) prop(ch, a);
    };
    prop(root, 1);
  }
  return { root, sync, stats, ready: Promise.all(jobs) };
}
