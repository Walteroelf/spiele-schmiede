// Eigene Linien-Symbole (24 × 24). Farbe = Schriftfarbe, siehe DESIGN.md im HTML-Editor.
const c = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
const p = d => `<path d="${d}"/>`;
const punkt = (x, y) => `<circle cx="${x}" cy="${y}" r="1" fill="currentColor"/>`;
const STERN = 'M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1-4.5-4.2 6.1-.8z';
const HERZ = 'M12 20C5 15 3 12 3 8.8 3 6.2 5 4.5 7.4 4.5c1.9 0 3.6 1.1 4.6 2.8 1-1.700 2.7-2.800 4.600-2.800C19 4.5 21 6.2 21 8.800 21 12 19 15 12 20z';
const NOTE = p('M9 17V5l11-2v12') + c(6.5, 17, 2.5) + c(17.5, 15, 2.5);

const SYMBOLE = {
  // Bedienung
  ton: p('M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.500 6.500a8 8 0 0 1 0 11'),
  zurueck: p('M19 12H5M11 6l-6 6 6 6'),
  weiter: p('M5 12h14M13 6l6 6-6 6'),
  wuerfel: '<rect x="4" y="4" width="16" height="16" rx="3"/>' + punkt(8.5, 8.5) + punkt(12, 12) + punkt(15.5, 15.5),
  kreuz: p('M6 6l12 12M18 6L6 18'),
  haken: p('M4 12.500l5 5L20 6.500'),
  kopieren: '<rect x="8" y="8" width="12" height="12" rx="2"/>' + p('M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3'),
  chat: p('M4 5h16v11H10l-5 4v-4H4zM8 9h8M8 12h5'),
  editor: p('M8 7l-5 5 5 5M16 7l5 5-5 5M14 5l-4 14'),
  zahnrad: c(12, 12, 3) + c(12, 12, 7) + p('M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2'),
  reparieren: p('M14 7a4.500 4.500 0 0 1 6-1l-3 3 .5 2 2 .5 2-3a5 5 0 0 1-7 6l-7 7a2 2 0 0 1-3-3l7-7a5 5 0 0 1 2.500-4.500z'),
  neu: p('M20 12a8 8 0 1 1-2.500-6M18 2v4.500h-4.500'),
  tasten: '<rect x="2" y="6" width="20" height="12" rx="2"/>' + p('M6 10h1M11.500 10h1M17 10h1M8 14h8'),

  idee: p('M9 18h6M10 21h4M8.500 15C6.500 13.500 5.500 11.500 5.500 9.500a6.500 6.500 0 0 1 13 0c0 2-1 4-3 5.500v1h-7z'),
  qr: p('M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM21 14v.100M18 18h3v3M14 21h.100'),

  // Spielarten
  fangen: p('M4 13h16l-2 8H6zM12 2v7M8.500 6L12 9.500 15.500 6'),
  ausweichen: c(7, 7, 4) + p('M10 10l3 3M16 3c5 5 5 11-1 16M15 14v5h5'),
  sammeln: c(8, 15, 5) + c(16, 8, 5) + p('M8 13v4M16 6v4'),
  labyrinth: p('M3 3h18v18H7V7h10v10h-6v-6h2'),
  huepfen: p('M3 20h18M5 17C7 4 17 4 19 17M15.500 15l3.500 2 1.500-4'),
  platzen: c(12, 9, 6) + p('M12 15l-1.500 2h3zM12 17c-2 2 2 3 0 5'),
  musik: NOTE,
  quiz: p('M8 8a4 4 0 1 1 6 3.500c-1.500 1-2 1.700-2 3.500') + punkt(12, 20),

  // Figuren
  katze: p('M4 4l5 4h6l5-4v9l-3 5-5 3-5-3-3-5zM10 15l2 1.500 2-1.500M2 13l5 1M22 13l-5 1'),
  hund: p('M4 21v-7l4-4V4l4 3h4l5 4v4h-6l-2 6M8 10l4 2'),
  fisch: p('M2 12c4-8 12-8 15 0-3 8-11 8-15 0zM17 12l5-5v10zM8 8c2 2.500 2 5.500 0 8'),
  vogel: p('M2 7c4-1 7 0 10 4 3-4 6-5 10-4-2 5-5 7-8 7l-2 6-2-6c-3 0-6-2-8-7z'),
  rakete: p('M12 2c5 4 5 10 3 15H9C7 12 7 6 12 2zM9 13l-4 4v4l4-4M15 13l4 4v4l-4-4M12 19v3') + c(12, 9, 2),
  auto: p('M3 16v-4l2-1 2-5h10l2 5 2 1v4zM5 11h14') + c(7.5, 17.5, 2) + c(16.5, 17.5, 2),
  roboter: p('M7 3h10v6H7zM5 11h14v7H5zM8 18v3M16 18v3M2 12v5M22 12v5M9 6h6M9 14.500h6'),
  ball: c(12, 12, 9) + p('M12 7.500l4 3-1.500 5h-5L8 10.500zM12 3v4.500M16 10.500L20.500 9M14.500 15.500l3 4M9.500 15.500l-3 4M8 10.500L3.500 9'),

  // Welten
  weltall: c(12, 12, 5) + p('M7.500 14C-1 19 3 22 12 15S25 3 16.500 8.500') + punkt(4, 5) + punkt(19, 19),
  meer: p('M2 7q2.500-3 5 0t5 0 5 0 5 0M2 13q2.500-3 5 0t5 0 5 0 5 0M2 19q2.500-3 5 0t5 0 5 0 5 0'),
  wald: p('M8 3l5 7h-2l4 6H1l4-6H3zM8 16v5M17 6l4 6h-2l3 4h-5M17 16v5'),
  stadt: p('M3 21V9h6v12M9 21V3h7v18M16 21V12h5v9M2 21h20M11.500 7h2M11.500 11h2M11.500 15h2M5 13h2M5 17h2'),
  wiese: p('M2 20h20M5 20l-1-5M7 20l1-4M17 20l-1-4M19 20l1-5M12 20v-9') + c(12, 8, 3),
  himmel: p('M7 19a4.500 4.500 0 0 1 0-9 5.500 5.500 0 0 1 10.500 1.500 3.800 3.800 0 0 1 0 7.500zM6 3v2M2 7h2M3 4l1.500 1.500'),

  // Sachen zum Sammeln
  stern: p(STERN),
  apfel: p('M12 8C8 5 4 7 4 12s4 11 8 8c4 3 8-3 8-8s-4-7-8-4zM12 8c0-3 1-5 4-5'),
  herz: p(HERZ),
  muenze: c(12, 12, 9) + c(12, 12, 5),
  banane: p('M18 3c3 12-6 20-16 14 8 1 13-5 13-13zM15 4l2-2 2 2'),
  eis: p('M7 11l5 11 5-11M6.500 11a5.500 5.500 0 1 1 11 0z'),

  // Ziel
  drei: p('M8 5c8-4 11 6 3 7 9 0 6 12-4 7'),
  zehn: p('M4 8l4-4v16') + '<rect x="12" y="4" width="9" height="16" rx="4.5"/>',
  uhr: c(12, 13, 8) + p('M12 9v4l3 2M9 2h6'),
  unendlich: p('M12 12c-5-8-10-5-10 0s5 8 10 0c5-8 10-5 10 0s-5 8-10 0z'),

  // Tasten
  leer: '<rect x="2" y="7" width="20" height="10" rx="3"/>' + p('M7 12v2h10v-2'),
  zwei: p('M10 6l-7 6 7 6zM14 6l7 6-7 6z'),
  vier: p('M12 2l4 5H8zM12 22l-4-5h8zM2 12l5-4v8zM22 12l-5 4V8z'),
  alle: p('M12 2l3 4H9zM12 15l-3-4h6zM3 9l4-3v6zM21 9l-4 3V6z') + '<rect x="3" y="18" width="18" height="4" rx="2"/>',
  hoch: p('M12 20V5M6 11l6-6 6 6'),
  runter: p('M12 4v15M6 13l6 6 6-6'),
  links: p('M20 12H5M11 6l-6 6 6 6'),
  rechts: p('M4 12h15M13 6l6 6-6 6'),

  // Tempo und Fehler
  langsam: p('M3 19h18M5 19a6 6 0 1 1 12 0M11 19a2.500 2.500 0 1 1 0-5M17 19c3 0 3-4 3-8M20 11l-2-3M20 11l2-3'),
  mittel: c(13, 4, 2) + p('M12 8l-2 7 4 3v4M10 15l-3 6M12 9l-5 3M12 9l3 4h4'),
  schnell: p('M13 2L4 14h7l-1 8 10-13h-7z'),
  start: c(12, 12, 9) + p('M10 8l6 4-6 4z'),
  bild: p('M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6'),
  stumm: p('M4 9v6h4l5 4V5L8 9zM16 9l6 6M22 9l-6 6'),
  klein: c(11, 11, 7) + p('M16 16l5 5M8 11h6M11 8v6'),
  schwer: p('M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12'),
  punkte: p(STERN) + p('M2 3l3 3M22 3l-3 3')
};

const symbol = name => `<svg class="symbol" viewBox="0 0 24 24" aria-hidden="true">${SYMBOLE[name] || ''}</svg>`;
