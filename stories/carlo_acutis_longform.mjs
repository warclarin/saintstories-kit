// St. Carlo Acutis, the first SaintStories long-form video (16:9, 1920x1080, about 6 min; YouTube, 2026-11-23).
// Whole life in four chapters: the hook (a saint in sneakers), the turn (faith, the poor, code, the Eucharistic miracles),
// the trial (leukemia at 15, his offering), the legacy (Assisi, two miracles, beatification 2020, canonization 2025).
// Landscape kit (opt-in): ../landscape.mjs first, STORY.format = 'landscape', art in 1920x1080 coordinates.
// One camera (cam3d) with a longer lens (fov 24): character plane 20 units away; the 3D ground meets a card's feet at
// art y = 540 + 254 x depth (depth 1: 794, 0.95: 781, 0.92: 774, 0.85: 756, 0.75 MID: 730); camera height 2.0, no pitch.
// All 3D sets live in carlo_acutis_longform.bg3d.js (one shared renderer: cam3d.shared).
import '../landscape.mjs';
import { ART, LIGHT_L, thumbArt } from './carlo_acutis_longform_art.mjs';

// ================================================================ narration (written first; pictures follow it)
const T = {
  hook:   { speed: 1.05, gap: 0.22, gain: 1 },
  turn:   { speed: 1.0, gap: 0.28, gain: 0 },
  warm:   { speed: 0.97, gap: 0.3, gain: 0 },
  trial:  { speed: 0.95, gap: 0.32, gain: -1, voice: { am_michael: 0.85, am_onyx: 0.15 } },
  death:  { speed: 0.92, gap: 0.34, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
  legacy: { speed: 1.0, gap: 0.28, gain: 0 },
  glory:  { speed: 0.95, gap: 0.32, gain: -0.5 },
  close:  { speed: 0.9, gap: 0.34, gain: -0.5 },
};
const C = (text, o = {}) => ({ text, who: 'carlo', ...o });
const stub = () => '';

const SCENES = [
  // ---------------------------------------------------------------- 1 · the hook
  { chapter: 'A Saint in Sneakers', kicker: "ST. PETER'S SQUARE · SEPTEMBER 7, 2025", title: 'A Saint in Sneakers', tone: T.hook,
    say: ["On September 7, 2025, eighty thousand people filled Saint Peter's Square in Rome.", 'They had come to see a teenager declared a saint.'] },
  { kicker: 'MILAN, ITALY', title: 'An Ordinary Teenager', tone: T.hook,
    say: ['He wore jeans and sneakers.', 'He loved video games and soccer.', 'He taught himself to code, and built websites.'] },
  { kicker: '', title: '', tone: T.hook,
    say: ['He died at fifteen.', 'Today he is Saint Carlo Acutis, the first millennial saint, the boy many call the patron saint of the internet.', 'This is his story.'] },
  // ---------------------------------------------------------------- 2 · the turn
  { chapter: 'Childhood and First Communion', kicker: 'LONDON · MAY 3, 1991', title: 'Born in London', tone: T.turn,
    say: ['Carlo was born in London on May 3, 1991, to Italian parents, Andrea and Antonia.', 'A few months later, the family moved home to Milan.'] },
  { kicker: 'MILAN · THE 1990s', title: "A Little Boy's Questions", tone: T.turn,
    say: ['His parents were not very religious.', 'But little Carlo kept asking questions about God, many of them sparked by his nanny, a devout Polish woman.',
      'His mother later said that his questions led her back to the faith.'] },
  { kicker: 'JUNE 16, 1998', title: 'First Holy Communion', tone: T.warm,
    say: ['In 1998, when he was just seven, Carlo received his First Holy Communion.', 'From then on, he received Jesus as often as he could, and loved to pray before the Eucharist.',
      'He liked to say:', C('The Eucharist is my highway to heaven.')] },
  { kicker: 'CENTOLA, SOUTHERN ITALY', title: 'The Rosary by the Sea', tone: T.warm,
    say: ['In summer, by the sea in southern Italy, he would leave the beach to pray the rosary with the older ladies of the parish.', 'His plan for life was simple:',
      C("To always be close to Jesus, that's my life plan.")] },
  { chapter: 'The Poor, Video Games and Code', kicker: 'MILAN', title: 'Sleeping Bags for the Homeless', tone: T.turn,
    say: ["But Carlo's faith did not stay inside the church.", 'He saved his pocket money to buy sleeping bags for homeless people, and brought them hot drinks in the evening.',
      "He also helped at soup kitchens run by Capuchin friars and Mother Teresa's sisters."] },
  { kicker: '', title: 'One Hour a Week', tone: T.turn,
    say: ['He loved video games, too.', 'But he did not want them to rule his life, so he allowed himself just one hour a week.'] },
  { kicker: '', title: 'A Self-Taught Coder', tone: T.turn,
    say: ['Instead, he poured his talent into computers.', 'He taught himself programming and web design, and when his parish priest needed a website, Carlo built it.',
      'He made another one for a volunteer project at his school.'] },
  { kicker: '', title: 'Rajesh', tone: T.warm,
    say: ["At home, the family's helper, Rajesh, was a Hindu from Mauritius.", 'After many talks with Carlo about Jesus, Rajesh asked to be baptized.',
      'At twelve, Carlo was already teaching catechism to younger children.'] },
  { chapter: 'The Eucharistic Miracles Website', kicker: '', title: 'His Biggest Project', tone: T.turn,
    say: ['Then Carlo began his biggest project.', "He gathered the stories of Eucharistic miracles from around the world, events the Church has studied and recognized, where Christ's presence in the Eucharist was seen in an extraordinary way.",
      'Over a hundred of them, country by country, with photos and maps.'] },
  { kicker: '', title: 'A Website for the World', tone: T.turn,
    say: ['He turned it all into a website, and an exhibition anyone could show.', 'It took him years of work.'] },
  // ---------------------------------------------------------------- 3 · the trial
  { chapter: 'The Diagnosis', kicker: 'MILAN · OCTOBER 2006', title: 'A Sore Throat', tone: T.trial,
    say: ['In early October 2006, Carlo got a sore throat. It looked like the flu.', 'But within days he grew weaker, and on Sunday, October 8, he could not even get up for Mass.'] },
  { kicker: 'OCTOBER 2006', title: 'The Diagnosis', tone: T.trial,
    say: ['In the hospital, doctors gave the news: acute promyelocytic leukemia, a fast and aggressive cancer of the blood.', 'Carlo was fifteen.'] },
  { kicker: 'SAN GERARDO HOSPITAL · MONZA', title: 'No Complaints', tone: T.trial,
    say: ['He did not complain.', 'When the doctors asked if he was in great pain, he answered:', C('There are people who suffer much more than me.')] },
  { kicker: '', title: 'For the Pope and the Church', tone: T.trial,
    say: ['Then he made an offering:', C('I offer to the Lord the sufferings that I will have to undergo, for the Pope and for the Church.', { speed: 0.85 })] },
  { kicker: 'OCTOBER 4, 2006', title: 'The Feast of St. Francis', tone: T.trial,
    say: ['Days earlier, on October 4, the feast of Saint Francis, his website of Eucharistic miracles had gone online.', 'Carlo had asked to be buried in Assisi, the town of the saint he loved.'] },
  { kicker: 'OCTOBER 12, 2006', title: 'Fifteen Years', tone: T.death,
    say: ['On October 11, bleeding in his brain left him in a coma.', 'On October 12, 2006, Carlo Acutis died. He was fifteen years old.'] },
  // ---------------------------------------------------------------- 4 · the legacy
  { chapter: 'Assisi and Two Miracles', kicker: 'ASSISI', title: 'Home in Assisi', tone: T.legacy,
    say: ['But his story did not end in that hospital room.', 'He was laid to rest in Assisi, as he had wished.',
      'In 2019, his tomb was moved to the Sanctuary of the Spoliation, where Saint Francis once gave away everything he owned.'] },
  { kicker: 'CHRISTUS VIVIT · 2019', title: 'Originals, Not Photocopies', tone: T.legacy,
    say: ['That same year, Pope Francis held him up as a model for young people everywhere, and quoted his words:', C('All people are born as originals, but many die as photocopies.')] },
  { kicker: 'CAMPO GRANDE, BRAZIL', title: 'The First Miracle', tone: T.legacy,
    say: ['In Brazil, a little boy named Mattheus was born with a rare defect of the pancreas. He could hardly eat.',
      'At a prayer service, he kissed a relic of Carlo and prayed that he would stop throwing up.', 'He was healed. Doctors found that his pancreas had become normal.'] },
  { kicker: 'ASSISI · OCTOBER 10, 2020', title: 'Blessed Carlo', tone: T.glory,
    say: ['In 2020, Pope Francis recognized the miracle, and on October 10, Carlo was beatified in the Basilica of Saint Francis in Assisi.'] },
  { kicker: 'FLORENCE · 2022', title: 'The Second Miracle', tone: T.legacy,
    say: ['In 2022, Valeria, a student from Costa Rica, fell from her bike in Florence and suffered a severe brain bleed.', 'Doctors feared she would not survive.',
      "Her mother prayed at Carlo's tomb in Assisi. That same day, Valeria began breathing on her own.", 'In 2024, the Church recognized her healing as a second miracle.'] },
  { chapter: 'Canonization and Legacy', kicker: 'ROME · APRIL 2025', title: 'A Delay', tone: T.legacy,
    say: ['His canonization was set for April 2025.', 'But Pope Francis died that Easter Monday, and the ceremony was postponed.'] },
  { kicker: "ST. PETER'S SQUARE · SEPTEMBER 7, 2025", title: 'Saint Carlo Acutis', tone: T.glory,
    say: ['On September 7, 2025, Pope Leo XIV declared Carlo Acutis a saint, together with Pier Giorgio Frassati.', 'His younger brother Michele read at the Mass.'] },
  { kicker: 'TODAY', title: 'Still Reaching the World', tone: T.glory,
    say: ['In a single year, more than a million pilgrims came to his tomb.', 'His exhibition of Eucharistic miracles has traveled to five continents.',
      { text: 'He lived only fifteen years, and he never became a photocopy.', speed: 0.9 }] },
  { kicker: 'FEAST DAY · OCTOBER 12', title: 'St. Carlo Acutis', tone: T.close, title_out: false,
    say: ['His feast day is October 12.', 'Saint Carlo Acutis, pray for us.'] },
];

export const STORY = {
  slug: 'longform_st_carlo_acutis', name: 'LongForm_St_Carlo_Acutis_A_Saint_in_Sneakers',
  format: 'landscape',
  bg3d: './carlo_acutis_longform.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  // one camera for 3D + SVG with a longer lens for 16:9 (fov 24) and one shared WebGL renderer for all 28 scenes
  cam3d: { plane: 20, dof: 2, fov: 24, shared: true },
  bg3d_vars: { light: LIGHT_L },
  shift: 0,
  thumb_hook: 'The first millennial saint', thumb_title: 'St. Carlo Acutis', thumb_scene: 0, thumb_t: 6,
  thumb_override: { art: thumbArt, bg3d: 'sqCanon', cam: { move: 'push', amt: 0.02 } },
  voice: 'am_michael', speed: 0.95,
  // continuous voiceover; the last scene holds ~10 s after "pray for us" for YouTube's end-screen elements
  flow: { last: 10 },
  fx: { handheld: true, leak: true, loop: false, fadein: false },
  audio: { bitrate: '384k', channels: 2 },
  endcard: 'Subscribe to SaintStories for more saints',
  endcard_dur: 9,
  cast: { carlo: { voice: 'im_nicola', speed: 1.0 } },
  fix: {
    'ɐkjˈuːɾiz': 'ɐkˈuːtɪs',                     // Acutis (Italian: a-KOO-tis)
    'ˈændɹiə': 'ændɹˈeɪə',                       // Andrea (Italian man's name)
    'ɹˈɑːdʒɛʃ': 'ɹɑːdʒˈeɪʃ',                     // Rajesh
    'kˈæpətʃˌɪn': 'kˈæpjʊtʃɪn',                  // Capuchin
    'pɹˌɑːmɪˌɛləsˈɪɾɪk': 'pɹˌoʊmaɪəloʊsˈɪɾɪk',   // promyelocytic
    'ɐsˈɪsi': 'ɐsˈiːsi',                         // Assisi
    'mˈætθɪəs': 'mɐtˈeɪʊs',                      // Mattheus (Brazilian)
    'vælˈɪɹiə': 'vɑːlˈɛɹiə',                     // Valeria (Spanish)
    'pˈɪɹ dʒɪˈɔːɹdʒɪˌoʊ': 'pjˈɛɹ dʒˈɔːɹdʒoʊ',   // Pier Giorgio
    'fɹæsˈɑːɾi': 'fɹɑːsˈɑːti',                   // Frassati
    'mɪʃˈɛl': 'mɪkˈɛleɪ',                        // Michele (Italian)
    'ɹˈiːd æt ðə': 'ɹˈɛd æt ðə',                 // "read at the Mass" (past tense)
    'mˈeɪ θɹˈiː': 'mˈeɪ θˈɜːd',                  // dates read as ordinals: May third, September seventh ...
    'sɛptˈɛmbɚ sˈɛvən': 'sɛptˈɛmbɚ sˈɛvənθ',
    'ɑːktˈoʊbɚɹ ˈeɪt': 'ɑːktˈoʊbɚɹ ˈeɪtθ',
    'ɑːktˈoʊbɚ fˈɔːɹ': 'ɑːktˈoʊbɚ fˈɔːɹθ',
    'ɑːktˈoʊbɚɹ ɪlˈɛvən': 'ɑːktˈoʊbɚɹ ɪlˈɛvənθ',
    'ɑːktˈoʊbɚ twˈɛlv': 'ɑːktˈoʊbɚ twˈɛlfθ',
    'ɑːktˈoʊbɚ tˈɛn': 'ɑːktˈoʊbɚ tˈɛnθ',
  },
  scenes: SCENES.map((s, i) => ({ art: stub, ...s, ...(ART[i] || {}) })),
};
