'use strict';

// Jede Wahl: [Symbol, Wort auf der Kachel, Satzteil für den Prompt]
const SCHRITTE = [
  { id: 'spiel', symbol: 'fangen', frage: 'Was für ein Spiel?', zeile: 'Mein Spiel', wahl: [
    ['fangen', 'Fangen', 'Fang-Spiel: Dinge fallen von oben, meine Figur fängt sie'],
    ['ausweichen', 'Ausweichen', 'Ausweich-Spiel: Hindernisse kommen, meine Figur weicht aus'],
    ['sammeln', 'Sammeln', 'Sammel-Spiel: meine Figur läuft herum und sammelt Dinge ein'],
    ['labyrinth', 'Labyrinth', 'Labyrinth: meine Figur sucht den Weg zum Ziel und sammelt unterwegs Dinge'],
    ['huepfen', 'Hüpfen', 'Hüpf-Spiel: meine Figur läuft und springt über Hindernisse'],
    ['platzen', 'Platzen', 'Reaktions-Spiel: Dinge erscheinen, ich treffe sie im richtigen Moment'],
    ['musik', 'Musik', 'Musik-Spiel: jede Taste macht einen Ton, ich spiele Töne nach'],
    ['quiz', 'Quiz', 'Bilder-Quiz: große Bilder als Antworten, kaum Text, Fragen werden vorgelesen']
  ] },
  { id: 'figur', symbol: 'katze', frage: 'Wer spielt mit?', zeile: 'Meine Figur', wahl: [
    ['katze', 'Katze', 'eine Katze'], ['hund', 'Hund', 'ein Hund'], ['fisch', 'Fisch', 'ein Fisch'], ['vogel', 'Vogel', 'ein Vogel'],
    ['rakete', 'Rakete', 'eine Rakete'], ['auto', 'Auto', 'ein Auto'], ['roboter', 'Roboter', 'ein Roboter'], ['ball', 'Ball', 'ein Fußball']
  ] },
  { id: 'welt', symbol: 'weltall', frage: 'Wo ist das Spiel?', zeile: 'Der Ort', wahl: [
    ['weltall', 'Weltall', 'im Weltall'], ['meer', 'Meer', 'im Meer'], ['wald', 'Wald', 'im Wald'],
    ['stadt', 'Stadt', 'in der Stadt'], ['wiese', 'Wiese', 'auf einer Wiese'], ['himmel', 'Himmel', 'am Himmel']
  ] },
  { id: 'ding', symbol: 'stern', frage: 'Was gibt Punkte?', zeile: 'Punkte gibt es für', wahl: [
    ['stern', 'Sterne', 'Sterne'], ['apfel', 'Äpfel', 'Äpfel'], ['herz', 'Herzen', 'Herzen'],
    ['muenze', 'Münzen', 'Münzen'], ['banane', 'Bananen', 'Bananen'], ['eis', 'Eis', 'Eis']
  ] },
  { id: 'ziel', symbol: 'punkte', frage: 'Wann hast du gewonnen?', zeile: 'Ziel', wahl: [
    ['drei', '3 Punkte', 'Bei 3 Punkten habe ich gewonnen. Ich kann nicht verlieren.'],
    ['zehn', '10 Punkte', 'Bei 10 Punkten habe ich gewonnen. Ich habe 3 Leben.'],
    ['uhr', '1 Minute', 'Ich sammle in 1 Minute so viele Punkte wie möglich.'],
    ['unendlich', 'Ohne Ende', 'Das Spiel hat kein Ende. Ich kann nicht verlieren.']
  ] },
  { id: 'tasten', symbol: 'tasten', frage: 'Wie viele Kontakte benutzt du?', zeile: 'Steuerung', wahl: [
    ['leer', '1 Kontakt', 'nur die Leertaste. Das ganze Spiel geht mit dieser einen Taste.'],
    ['zwei', '2 Kontakte', 'nur Pfeil links und Pfeil rechts. Keine anderen Tasten, auch nicht zum Starten.'],
    ['vier', '4 Kontakte', 'nur die vier Pfeiltasten. Keine anderen Tasten, auch nicht zum Starten.'],
    ['alle', '5 Kontakte', 'die vier Pfeiltasten und die Leertaste.']
  ] },
  { id: 'tempo', symbol: 'schnell', frage: 'Wie schnell?', zeile: 'Tempo', wahl: [
    ['langsam', 'Langsam', 'sehr langsam'], ['mittel', 'Mittel', 'mittel'], ['schnell', 'Schnell', 'schnell, es wird langsam schneller']
  ] }
];

const FEHLER = [
  ['start', 'Startet nicht', 'Das Spiel startet nicht.'],
  ['tasten', 'Tasten gehen nicht', 'Das Spiel reagiert nicht auf die Tasten.'],
  ['bild', 'Nicht alles zu sehen', 'Ich sehe nicht das ganze Spiel. Es soll in ein kleines Fenster passen.'],
  ['klein', 'Zu klein', 'Alles ist zu klein. Mach Figuren und Dinge viel größer.'],
  ['schnell', 'Zu schnell', 'Das Spiel ist zu schnell.'],
  ['langsam', 'Zu langsam', 'Das Spiel ist zu langsam.'],
  ['schwer', 'Zu schwer', 'Das Spiel ist zu schwer. Mach es leichter.'],
  ['stumm', 'Kein Ton', 'Ich höre keine Töne.'],
  ['punkte', 'Punkte falsch', 'Die Punkte werden nicht richtig gezählt.']
];

const SZENARIO = [
  ['Name', 'Spiele-Schmiede'],
  ['Kurzbeschreibung', 'Wir bauen ein eigenes Spiel und steuern es mit dem MakeyMakey.'],
  ['Auftrag an die Lernenden', 'Beschreibe deine Spielidee: Was für ein Spiel ist es? Wer spielt mit? Wie gewinnt man?\nKopiere dann den Code in den HTML-Editor und probiere dein Spiel aus.\nWenn etwas nicht klappt, schreibe es hier in den Chat.'],
  ['Verhalten', `Du hilfst Schülerinnen und Schülern, ein kleines Spiel in HTML zu programmieren.

So sprichst du:
- Einfache Sprache, kurze Sätze, freundlich.
- Wenn der Text mit "Mein Spiel-Steckbrief" beginnt, frage nichts. Baue sofort das Spiel.
- Wenn sonst etwas Wichtiges fehlt, stelle nur eine Frage auf einmal. Stelle höchstens drei Fragen. Entscheide den Rest selbst.

So gibst du Code aus:
- Gib immer das vollständige Spiel als eine einzige HTML-Datei in genau einem Codeblock aus, auch bei kleinen Änderungen.
- Kürze nichts ab. Schreibe nie "Rest wie vorher".
- Schreibe nach dem Code höchstens zwei kurze Sätze. Erkläre den Code nur, wenn danach gefragt wird.

Regeln für jedes Spiel:
- Alles in einer Datei. Keine externen Dateien, Bilder, Schriften, Bibliotheken oder Links. Figuren mit Emojis oder selbst gezeichnet.
- Steuerung nur mit den Pfeiltasten und der Leertaste, passend zum MakeyMakey. Keine Maus nötig. Nennt der Steckbrief bestimmte Tasten, benutze nur diese.
- Ein Tastendruck reicht für eine Aktion. Man muss nie zwei Tasten gleichzeitig drücken.
- Gehaltene Tasten lösen die Aktion nicht mehrfach aus, außer beim Bewegen.
- Großer Start-Knopf in der Mitte. Nach dem Antippen reagiert das Spiel sofort auf die Tasten. Neustart auch mit einer der Spieltasten.
- Zusätzlich große Knöpfe zum Antippen, damit man ohne MakeyMakey testen kann.
- Das Spiel passt auf den Bildschirm, auch in ein kleines Vorschaufenster. Kein Scrollen und kein Zoomen.
- Langsames Tempo zu Beginn, große Figuren, gute Kontraste.
- Möglichst wenig Text. Zeige Punkte und Leben als Bilder.
- Töne erst nach dem Start und ohne Tondateien.
- Keine Daten abfragen oder speichern.
- Nur kindgerechte Inhalte ohne Gewalt.`]
];

const EDITOR_URL = 'https://walteroelf.github.io/html-editor/';
const FERTIG = SCHRITTE.length + 1;           // 0 … n-1 Auswahl, n Wunsch, n+1 Steckbrief
const $ = id => document.getElementById(id);

const speicher = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* privates Fenster */ } }
};

let stand = { schritt: 0, wahl: {}, wunsch: '' };
try {
  const s = JSON.parse(speicher.get('spiele-schmiede'));
  if (s && s.wahl) stand = { schritt: Math.min(Math.max(s.schritt | 0, 0), FERTIG), wahl: s.wahl, wunsch: String(s.wunsch || '') };
} catch (e) { /* neu anfangen */ }
const merken = () => speicher.set('spiele-schmiede', JSON.stringify(stand));

// Link zum Lernszenario: aus dem Klassen-Link (#chat=…) oder aus den Einstellungen
const webAdresse = u => { try { return new URL(u).protocol === 'https:' ? new URL(u).href : ''; } catch (e) { return ''; } };
function linkAusAdresse() {
  const m = location.hash.match(/^#chat=(.+)$/);
  if (!m) return;
  let u = '';
  try { u = webAdresse(decodeURIComponent(m[1])); } catch (e) { return; }
  if (u) speicher.set('spiele-schmiede-chat', u);
}
linkAusAdresse();
const chatLink = () => webAdresse(speicher.get('spiele-schmiede-chat'));

function el(tag, attr = {}, ...kinder) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attr)) {
    if (k.startsWith('on')) e[k] = v; else e.setAttribute(k, v);
  }
  e.append(...kinder);
  return e;
}
function knopf(text, bild, klasse, aktion) {
  const b = el('button', { type: 'button', class: 'knopf ' + klasse, onclick: aktion });
  b.innerHTML = symbol(bild);
  b.append(text);
  return b;
}

function vorlesen(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const s = new SpeechSynthesisUtterance(text);
  s.lang = 'de-DE';
  s.rate = 0.9;
  speechSynthesis.speak(s);
}
function tonKnopf(text, name) {
  const b = el('button', { type: 'button', class: 'ton', 'aria-label': name + ' vorlesen', onclick: () => vorlesen(text) });
  b.innerHTML = symbol('ton');
  return b;
}

async function kopieren(text, meldung) {
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; } catch (e) {
    const t = el('textarea');
    t.value = text;
    (document.querySelector('dialog[open]') || document.body).append(t);
    t.select();
    try { ok = document.execCommand('copy'); } catch (f) { /* nichts */ }
    t.remove();
  }
  meldung.textContent = ok ? 'Kopiert!' : 'Kopieren geht nicht. Markiere den Text und kopiere ihn selbst.';
  if (ok) vorlesen('Kopiert');
}

function kachel(eintrag, gedrueckt, aktion) {
  const [bild, wort] = eintrag;
  const b = el('button', { type: 'button', class: 'wahl', 'aria-pressed': String(gedrueckt), onclick: aktion });
  b.innerHTML = symbol(bild);
  b.append(el('span', {}, wort));
  return el('div', { class: 'kachel' }, b, tonKnopf(wort, wort));
}

const gewaehlt = s => s.wahl.find(w => w[0] === stand.wahl[s.id]);

function steckbrief() {
  const zeilen = ['Mein Spiel-Steckbrief. Bitte baue mir daraus sofort das Spiel.'];
  for (const s of SCHRITTE) {
    const w = gewaehlt(s);
    zeilen.push(`${s.zeile}: ${w ? w[2] : 'such du etwas Passendes aus'}`);
  }
  if (stand.wunsch.trim()) zeilen.push('Das wünsche ich mir noch: ' + stand.wunsch.trim());
  return zeilen.join('\n');
}

function chatKnoepfe(meldung) {
  const reihe = el('div', { class: 'reihe' });
  const link = chatLink();
  if (link) {
    const a = el('a', { class: 'knopf gross', href: link, target: '_blank', rel: 'noopener' });
    a.innerHTML = symbol('chat');
    a.append('2. AIS-Chat öffnen');
    reihe.append(a);
  } else {
    reihe.append(knopf('2. AIS-Chat öffnen', 'chat', 'gross', () => {
      meldung.textContent = 'Öffne das Lernszenario im AIS-Chat. Deine Lehrkraft hilft dir.';
      vorlesen(meldung.textContent);
    }));
  }
  const e = el('a', { class: 'knopf gelb gross', href: EDITOR_URL, target: '_blank', rel: 'noopener' });
  e.innerHTML = symbol('editor');
  e.append('3. HTML-Editor öffnen');
  reihe.append(e);
  return reihe;
}

function zeige(fokus) {
  const n = stand.schritt;
  const s = SCHRITTE[n];
  const inhalt = $('inhalt');
  inhalt.replaceChildren();

  $('schritte').replaceChildren(...[...SCHRITTE, { symbol: 'chat', frage: 'Noch ein Wunsch?' }, { symbol: 'haken', frage: 'Fertig' }].map((x, i) => {
    const fertig = x.id ? !!stand.wahl[x.id] : false;
    const b = el('button', { type: 'button', class: fertig ? 'fertig' : '', 'aria-label': x.frage, onclick: () => gehe(i) });
    if (i === n) b.setAttribute('aria-current', 'step');
    b.innerHTML = symbol(x.symbol);
    return el('li', {}, b);
  }));

  if (s) {
    $('frage').textContent = s.frage;
    inhalt.append(el('div', { class: 'raster' }, ...s.wahl.map((w, i) => kachel(w, stand.wahl[s.id] === w[0], () => waehle(s, i)))));
  } else if (n === SCHRITTE.length) {
    $('frage').textContent = 'Noch ein Wunsch?';
    const t = el('textarea', { id: 'wunsch', placeholder: 'Zum Beispiel: Die Katze soll lila sein.', oninput: () => { stand.wunsch = t.value; merken(); } });
    t.value = stand.wunsch;
    inhalt.append(el('label', { for: 'wunsch' }, 'Du kannst schreiben oder diktieren (Mikrofon auf der iPad-Tastatur). Du darfst auch einfach auf „Weiter“ tippen.'), t);
  } else {
    $('frage').textContent = 'Dein Spiel ist geplant!';
    const meldung = el('p', { class: 'meldung', role: 'status' });
    const liste = el('ul', { class: 'zettel' }, ...SCHRITTE.map((x, i) => {
      const w = gewaehlt(x);
      const b = el('button', { type: 'button', 'aria-label': `${x.frage} ${w ? w[1] : 'offen'}. Ändern`, onclick: () => gehe(i) });
      b.innerHTML = symbol(w ? w[0] : 'quiz');
      b.append(el('span', {}, w ? w[1] : 'Offen'));
      return el('li', {}, b);
    }));
    const text = steckbrief();
    inhalt.append(
      liste,
      el('div', { class: 'reihe' }, knopf('1. Kopieren', 'kopieren', 'gruen gross', () => kopieren(text, meldung)), tonKnopf(text, 'Steckbrief')),
      meldung,
      chatKnoepfe(meldung),
      el('details', {}, el('summary', {}, 'Text ansehen'), el('pre', {}, text)),
      el('div', { class: 'reihe' }, knopf('Neues Spiel', 'neu', 'leise', () => { stand = { schritt: 0, wahl: {}, wunsch: '' }; merken(); zeige(true); }))
    );
  }

  $('btnZurueck').classList.toggle('weg', n === 0);
  $('btnWuerfel').classList.toggle('weg', !s);
  $('btnWeiter').classList.toggle('weg', n === FERTIG);
  if (fokus) { $('frage').focus({ preventScroll: true }); scrollTo(0, 0); }
}

function gehe(n) {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  stand.schritt = Math.min(Math.max(n, 0), FERTIG);
  merken();
  zeige(true);
}
function waehle(s, i) {
  stand.wahl[s.id] = s.wahl[i][0];
  merken();
  vorlesen(s.wahl[i][1]);
  zeige(false);
  $('inhalt').querySelectorAll('.wahl')[i].focus({ preventScroll: true });
}

// ---------- Fenster ----------
const fenster = $('fenster');
let tastenAktiv = false;
function oeffne(titel, ...inhalt) {
  $('fensterTitel').textContent = titel;
  $('fensterInhalt').replaceChildren(...inhalt);
  if (!fenster.open) fenster.showModal();
}
fenster.addEventListener('close', () => { tastenAktiv = false; });

function tastenTest() {
  const feld = el('div', { class: 'tastenfeld' });
  const taste = (key, bild, name, klasse = '') => {
    const d = el('div', { class: 'taste ' + klasse, 'data-key': key, role: 'img', 'aria-label': name });
    d.innerHTML = symbol(bild);
    return d;
  };
  const luecke = () => el('span');
  feld.append(
    luecke(), taste('ArrowUp', 'hoch', 'Pfeil hoch'), luecke(),
    taste('ArrowLeft', 'links', 'Pfeil links'), taste('ArrowDown', 'runter', 'Pfeil runter'), taste('ArrowRight', 'rechts', 'Pfeil rechts'),
    taste(' ', 'leer', 'Leertaste', 'breit')
  );
  oeffne('Tasten-Test', el('p', { class: 'meldung' }, 'Berühre deine Kontakte. Was ankommt, wird grün.'), feld);
  tastenAktiv = true;
  $('fensterTitel').setAttribute('tabindex', '-1');
  $('fensterTitel').focus();
}
function tastenEreignis(e) {
  if (!tastenAktiv) return;
  const d = [...document.querySelectorAll('.taste')].find(x => x.dataset.key === e.key);
  if (!d) return;
  e.preventDefault();
  d.classList.toggle('an', e.type === 'keydown');
}
addEventListener('keydown', tastenEreignis);
addEventListener('keyup', tastenEreignis);

function hilfe() {
  const aktiv = new Set();
  const meldung = el('p', { class: 'meldung', role: 'status' });
  const raster = el('div', { class: 'raster' });
  const zeichne = () => raster.replaceChildren(...FEHLER.map((f, i) => kachel(f, aktiv.has(i), () => {
    aktiv.has(i) ? aktiv.delete(i) : aktiv.add(i);
    meldung.textContent = '';
    vorlesen(f[1]);
    zeichne();
    raster.querySelectorAll('.wahl')[i].focus({ preventScroll: true });
  })));
  zeichne();
  const mehr = el('textarea', { id: 'mehr', placeholder: 'Was soll anders sein?' });
  const kopiere = () => {
    const probleme = FEHLER.filter((f, i) => aktiv.has(i)).map(f => '- ' + f[2]);
    if (mehr.value.trim()) probleme.push('- ' + mehr.value.trim());
    if (!probleme.length) { meldung.textContent = 'Tippe zuerst auf ein Bild.'; vorlesen(meldung.textContent); return; }
    kopieren(`Bitte verbessere mein Spiel:\n${probleme.join('\n')}\nGib mir wieder das ganze Spiel in einem Codeblock.`, meldung);
  };
  oeffne('Was klappt nicht?', raster, el('h3', {}, el('label', { for: 'mehr' }, 'Noch etwas?')), mehr,
    el('div', { class: 'reihe' }, knopf('Kopieren', 'kopieren', 'gruen gross', kopiere)), meldung,
    el('p', {}, 'Füge den Text im selben Chat ein, in dem dein Spiel entstanden ist.'));
}

function lehrkraft() {
  const meldung = el('p', { class: 'meldung', role: 'status' });
  const feld = el('input', { type: 'url', id: 'chatFeld', placeholder: 'https://…' });
  feld.value = chatLink();
  const sichern = () => {
    const roh = feld.value.trim();
    const u = webAdresse(roh);
    if (roh && !u) { meldung.textContent = 'Bitte einen Link eingeben, der mit https:// beginnt.'; return null; }
    speicher.set('spiele-schmiede-chat', u);
    // altes #chat=… entfernen, sonst überschreibt es beim Neuladen den neuen Link
    history.replaceState(null, '', location.pathname + location.search);
    zeige(false);
    return u;
  };
  const teile = [
    el('h3', {}, '1. Lernszenario im AIS-Chat anlegen'),
    el('p', {}, 'Kopiere die Texte in die passenden Felder. „Hintergrundwissen“ bleibt leer.'),
    ...SZENARIO.flatMap(([name, text]) => {
      const m = el('span', { role: 'status' });
      return [el('details', {}, el('summary', {}, name), el('pre', {}, text)),
        el('div', { class: 'reihe' }, knopf(name + ' kopieren', 'kopieren', 'leise', () => kopieren(text, m)), m)];
    }),
    el('h3', {}, el('label', { for: 'chatFeld' }, '2. Link zum Lernszenario eintragen')),
    feld,
    el('p', {}, 'Der Link wird nur auf diesem Gerät gespeichert. Mit dem Klassen-Link bekommen ihn auch die Geräte der Kinder.'),
    el('div', { class: 'reihe' },
      knopf('Speichern', 'haken', 'gruen', () => { if (sichern() !== null) meldung.textContent = 'Gespeichert.'; }),
      knopf('Klassen-Link kopieren', 'kopieren', 'leise', () => {
        const u = sichern();
        if (u === null) return;
        if (!u) { meldung.textContent = 'Trage zuerst den Link ein.'; return; }
        kopieren(location.origin + location.pathname + '#chat=' + encodeURIComponent(u), meldung);
      })),
    meldung
  ];
  oeffne('Für Lehrkräfte', ...teile);
}

document.querySelectorAll('[data-symbol]').forEach(b => b.insertAdjacentHTML('afterbegin', symbol(b.dataset.symbol)));
$('frageTon').onclick = () => vorlesen($('frage').textContent);
$('btnZurueck').onclick = () => gehe(stand.schritt - 1);
$('btnWeiter').onclick = () => gehe(stand.schritt + 1);
$('btnWuerfel').onclick = () => {
  const s = SCHRITTE[stand.schritt];
  if (!s) return;
  const andere = s.wahl.map((w, i) => i).filter(i => s.wahl[i][0] !== stand.wahl[s.id]);
  waehle(s, andere[Math.floor(Math.random() * andere.length)]);
};
$('btnTasten').onclick = tastenTest;
$('btnHilfe').onclick = hilfe;
$('btnLehrer').onclick = lehrkraft;
$('fensterZu').onclick = () => fenster.close();
addEventListener('hashchange', () => { linkAusAdresse(); zeige(false); });
zeige(false);
