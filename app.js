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
  { id: 'gefahr', symbol: 'stein', frage: 'Was ist ein Fehler?', zeile: 'Ein Fehler passiert durch', wahl: [
    ['stein', 'Steine', 'Steine, die ich berühre'], ['himmel', 'Wolken', 'Wolken, die ich berühre'], ['roboter', 'Gegner', 'Gegner, die mich fangen'],
    ['daneben', 'Daneben', 'Daneben liegen oder etwas verpassen'], ['haken', 'Keine Fehler', 'nichts. Es gibt keine Fehler.']
  ] },
  { id: 'leben', symbol: 'herz', frage: 'Was passiert bei einem Fehler?', zeile: 'Bei einem Fehler', wahl: [
    ['herz', '3 Leben', 'verliere ich 1 von 3 Leben. Ohne Leben ist das Spiel verloren.'],
    ['herzen', '5 Leben', 'verliere ich 1 von 5 Leben. Ohne Leben ist das Spiel verloren.'],
    ['minus', 'Punkt weg', 'verliere ich 1 Punkt. Zähle die Fehler und zeige sie an.'],
    ['neu', 'Von vorn', 'beginnt das Spiel von vorn.'],
    ['haken', 'Nichts', 'passiert nichts Schlimmes. Ich kann nicht verlieren.']
  ] },
  { id: 'ziel', symbol: 'punkte', frage: 'Wann hast du gewonnen?', zeile: 'Ziel', wahl: [
    ['drei', '3 Punkte', 'Bei 3 Punkten habe ich gewonnen.'],
    ['zehn', '10 Punkte', 'Bei 10 Punkten habe ich gewonnen.'],
    ['uhr', '1 Minute', 'Ich sammle in 1 Minute so viele Punkte wie möglich.'],
    ['unendlich', 'Ohne Ende', 'Das Spiel hat kein festes Ende. Ich höre selbst mit dem Beenden-Knopf auf.']
  ] },
  { id: 'tasten', symbol: 'tasten', frage: 'Wie viele Kontakte benutzt du?', zeile: 'Steuerung', wahl: [
    ['leer', '1 Kontakt', 'nur die Leertaste. Das ganze Spiel geht mit dieser einen Taste.'],
    ['zwei', '2 Kontakte', 'nur Pfeil links und Pfeil rechts. Keine anderen Tasten, auch nicht zum Starten.'],
    ['vier', '4 Kontakte', 'nur die vier Pfeiltasten. Keine anderen Tasten, auch nicht zum Starten.'],
    ['alle', '5 Kontakte', 'die vier Pfeiltasten und die Leertaste.']
  ] },
  { id: 'knoepfe', symbol: 'pause', frage: 'Welche Knöpfe? Du darfst mehrere antippen.', zeile: 'Große Knöpfe im Spiel zum Antippen', mehrfach: true, wahl: [
    ['pause', 'Pause', 'Pause und Weiter'], ['neu', 'Neu starten', 'Neu starten'], ['kreuz', 'Beenden', 'Beenden (zurück zum Startbild)'], ['ton', 'Ton an/aus', 'Ton an und aus']
  ] },
  { id: 'level', symbol: 'treppe', frage: 'Wird es schwerer?', zeile: 'Schwierigkeit', wahl: [
    ['gleich', 'Bleibt gleich', 'bleibt immer gleich'], ['treppe', '3 Level', 'drei Level, jedes etwas schwerer. Zeige das Level an.'], ['schnell', 'Immer schneller', 'wird nach und nach schneller']
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
  ['punkte', 'Punkte falsch', 'Die Punkte werden nicht richtig gezählt.'],
  ['herz', 'Keine Fehler', 'Fehler werden nicht gezählt. Zeige Leben oder Fehlerpunkte groß oben an und zähle sie richtig.'],
  ['kreuz', 'Knöpfe fehlen', 'Ich brauche große Knöpfe zum Antippen: Pause, Neu starten und Beenden.'],
  ['uhr', 'Hört nie auf', 'Das Spiel läuft einfach durch. Es braucht ein klares Ende mit „Gewonnen“ oder „Verloren“ und einen Knopf zum Nochmalspielen.']
];

// Überschriften und Reihenfolge wie im AIS-Chat-Fenster „Lernszenario“
const SZENARIO = [
  ['Name des Lernszenarios', 'Spiele-Schmiede'],
  ['Kurzbeschreibung', 'Wir bauen ein eigenes Spiel.'],
  ['Instruktionen', `ROLLE
Du bist eine freundliche Spiele-Programmiererin oder ein freundlicher Spiele-Programmierer.

KONTEXT
Schülerinnen und Schüler bauen ein kleines eigenes Spiel in HTML. Manche können nur wenig lesen und schreiben. Sie fügen meist einen fertigen Spiel-Steckbrief ein. Den Code kopieren sie und spielen das Spiel auf dem iPad.

VERHALTEN
- Einfache Sprache, kurze Sätze, freundlich.
- Wenn der Text mit "Mein Spiel-Steckbrief" beginnt, frage nichts. Baue sofort das Spiel.
- Wenn sonst etwas Wichtiges fehlt, stelle nur eine Frage auf einmal. Stelle höchstens drei Fragen. Entscheide den Rest selbst.
- Halte dich genau an den Steckbrief.
- Nur kindgerechte Inhalte ohne Gewalt.
- Frage keine Daten ab und speichere keine.

FORMAT
- Gib immer das vollständige Spiel als eine einzige HTML-Datei in genau einem Codeblock aus, auch bei kleinen Änderungen.
- Kürze nichts ab. Schreibe nie "Rest wie vorher".
- Schreibe nach dem Code höchstens zwei kurze Sätze. Erkläre den Code nur, wenn danach gefragt wird.

Regeln für jedes Spiel:
- Alles in einer Datei. Keine externen Dateien, Bilder, Schriften, Bibliotheken oder Links. Figuren mit Emojis oder selbst gezeichnet.
- Steuerung nur mit den Pfeiltasten und der Leertaste. Nennt der Steckbrief bestimmte Tasten, benutze nur diese. Keine Maus nötig.
- Ein Tastendruck reicht für eine Aktion. Man muss nie zwei Tasten gleichzeitig drücken.
- Gehaltene Tasten lösen die Aktion nicht mehrfach aus, außer beim Bewegen.
- Großer Start-Knopf in der Mitte. Nach dem Antippen reagiert das Spiel sofort auf die Tasten. Neustart auch mit einer der Spieltasten.
- Zusätzlich große Knöpfe zum Antippen für die Steuerung.
- Punkte und Leben oder Fehler stehen groß oben. Das Spiel hat ein klares Ende, außer der Steckbrief sagt etwas anderes.
- Das Spiel passt auf den Bildschirm, auch in ein kleines Fenster. Kein Scrollen und kein Zoomen.
- Langsames Tempo zu Beginn, große Figuren, gute Kontraste.
- Möglichst wenig Text. Zeige Punkte und Leben als Bilder.
- Töne erst nach dem Start und ohne Tondateien.`],
  ['Arbeitsauftrag', 'Füge deinen Spiel-Steckbrief ein und sende ihn.\nWarte, bis der Code fertig ist, und tippe beim Code auf „Kopieren“.\nTippe dann in der Spiele-Schmiede auf „Spiel starten“.']
];

const CHAT_URL = 'https://app.ais-chat.schule/login';
const FERTIG = SCHRITTE.length + 1;           // 0 … n-1 Auswahl, n Wunsch, n+1 Steckbrief
const $ = id => document.getElementById(id);

const speicher = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* privates Fenster */ } }
};

const neuerStand = () => ({ schritt: 0, wahl: { knoepfe: ['neu', 'kreuz'] }, eigen: {}, wunsch: '' });
let stand = neuerStand();
try {
  const s = JSON.parse(speicher.get('spiele-schmiede'));
  if (s && s.wahl) stand = { schritt: Math.min(Math.max(s.schritt | 0, 0), FERTIG), wahl: s.wahl, eigen: s.eigen || {}, wunsch: String(s.wunsch || '') };
} catch (e) { /* neu anfangen */ }
if (!Array.isArray(stand.wahl.knoepfe)) stand.wahl.knoepfe = ['neu', 'kreuz'];
const merken = () => speicher.set('spiele-schmiede', JSON.stringify(stand));

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
}

function kachel(eintrag, gedrueckt, aktion) {
  const [bild, wort] = eintrag;
  const b = el('button', { type: 'button', class: 'wahl', 'aria-pressed': String(gedrueckt), onclick: aktion });
  b.innerHTML = symbol(bild);
  b.append(el('span', {}, wort));
  return el('div', { class: 'kachel' }, b, tonKnopf(wort, wort));
}

const EIGEN = ['idee', 'Eigene Idee'];
const eigenText = s => String(stand.eigen[s.id] || '').trim();
const ist = (s, w) => {
  const v = stand.wahl[s.id], id = w === EIGEN ? 'eigen' : w[0];
  return s.mehrfach ? Array.isArray(v) && v.includes(id) : v === id;
};
// Das Gewählte als [Symbol, Wort, Satzteil]; bei mehreren zusammengefasst
function gewaehlt(s) {
  const liste = [...s.wahl, EIGEN].filter(w => ist(s, w));
  if (!liste.length) return null;
  if (!s.mehrfach || (liste.length === 1 && liste[0] === EIGEN)) return liste[0];
  return [liste[0][0], liste.length > 1 ? `${liste.length} Knöpfe` : liste[0][1],
    liste.map(w => w === EIGEN ? eigenText(s) : w[2]).filter(Boolean).join(', ')];
}

function steckbrief() {
  const zeilen = ['Mein Spiel-Steckbrief. Bitte baue mir daraus sofort das Spiel.'];
  for (const s of SCHRITTE) {
    const w = gewaehlt(s);
    const satz = w === EIGEN ? eigenText(s) : w && w[2];
    zeilen.push(`${s.zeile}: ${satz || 'such du etwas Passendes aus'}`);
  }
  if (stand.wunsch.trim()) zeilen.push('Das wünsche ich mir noch: ' + stand.wunsch.trim());
  zeilen.push('Wichtig: Zeige Punkte und Leben oder Fehler groß oben an. Am Ende kommt „Gewonnen“ oder „Verloren“ mit einem Knopf zum Nochmalspielen. Vor dem Start erklärt ein Startbild die Steuerung mit Bildern.');
  return zeilen.join('\n');
}

// Bilderablauf oben: gewählte Bilder ersetzen die Schritt-Symbole
function zeichneAblauf() {
  const stationen = [
    ...SCHRITTE.map(s => ({ frage: s.frage, leer: s.symbol, wahl: gewaehlt(s) })),
    { frage: 'Noch ein Wunsch?', leer: 'chat', wahl: stand.wunsch.trim() ? ['chat', 'Wunsch'] : null },
    { frage: 'Fertig', leer: 'haken', wahl: null }
  ];
  $('schritte').replaceChildren(...stationen.map((x, i) => {
    const wort = x.wahl === EIGEN ? 'Idee' : x.wahl ? x.wahl[1] : '';
    const b = el('button', { type: 'button', class: x.wahl ? 'fertig' : '', 'aria-label': wort ? `${x.frage} ${wort}` : x.frage, onclick: () => gehe(i) });
    if (i === stand.schritt) b.setAttribute('aria-current', 'step');
    b.innerHTML = symbol(x.wahl ? x.wahl[0] : x.leer);
    b.append(el('span', {}, wort));
    return el('li', {}, b);
  }));
  const jetzt = $('schritte').children[stand.schritt];
  $('schritte').scrollLeft = jetzt.offsetLeft - ($('schritte').clientWidth - jetzt.offsetWidth) / 2;
}

function zeige(fokus) {
  const n = stand.schritt;
  const s = SCHRITTE[n];
  const inhalt = $('inhalt');
  inhalt.replaceChildren();
  zeichneAblauf();

  inhalt.className = s ? 'auswahl' : 'mitte';

  if (s) {
    $('frage').textContent = s.frage;
    const kacheln = [...s.wahl, EIGEN].map((w, i) => kachel(w, ist(s, w), () => waehle(s, i)));
    inhalt.append(raster(kacheln));
    if (ist(s, EIGEN)) {
      const t = el('textarea', { id: 'eigen', placeholder: 'Meine Idee …', oninput: () => { stand.eigen[s.id] = t.value; merken(); } });
      t.value = stand.eigen[s.id] || '';
      inhalt.append(el('label', { for: 'eigen' }, 'Meine Idee: schreiben oder diktieren'), t);
    }
  } else if (n === SCHRITTE.length) {
    $('frage').textContent = 'Noch ein Wunsch?';
    const t = el('textarea', { id: 'wunsch', placeholder: 'Zum Beispiel: Die Katze soll lila sein.', oninput: () => { stand.wunsch = t.value; merken(); zeichneAblauf(); } });
    t.value = stand.wunsch;
    inhalt.append(el('label', { for: 'wunsch' }, 'Du kannst schreiben oder diktieren (Mikrofon auf der iPad-Tastatur). Du darfst auch einfach auf „Weiter“ tippen.'), t);
  } else {
    $('frage').textContent = 'Dein Spiel ist geplant!';
    const meldung = el('p', { class: 'meldung', role: 'status' });
    const liste = el('ul', { class: 'zettel' }, ...SCHRITTE.map((x, i) => {
      const w = gewaehlt(x);
      const b = el('button', { type: 'button', 'aria-label': `${x.frage} ${w ? w[1] : 'offen'}. Ändern`, onclick: () => gehe(i) });
      b.innerHTML = symbol(w ? w[0] : 'quiz');
      b.append(el('span', {}, w === EIGEN ? eigenText(x) || w[1] : w ? w[1] : 'Offen'));
      return el('li', {}, b);
    }));
    const text = steckbrief();
    inhalt.append(
      liste,
      el('div', { class: 'reihe' },
        knopf('Weiter zum KI-Chat', 'weiter', 'gruen riesig', () => { kopieren(text, meldung); chatOeffnen(); }),
        tonKnopf(text, 'Steckbrief')),
      meldung,
      el('div', { class: 'reihe' },
        knopf('Text ansehen', 'chat', 'leise', () => oeffne('Dein Text', el('pre', {}, text))),
        knopf('Neues Spiel planen', 'neu', 'leise', () => { stand = neuerStand(); merken(); zeige(true); }))
    );
  }

  $('btnZurueck').classList.toggle('weg', n === 0);
  $('btnWeiter').classList.toggle('weg', n === FERTIG);
  if (fokus) { $('frage').focus({ preventScroll: true }); scrollTo(0, 0); }
}

// Kachelraster, das ohne Scrollen in den Bildschirm passt
function raster(kacheln) {
  const n = kacheln.length;
  const r = el('div', { class: 'raster' }, ...kacheln);
  const quer = Math.ceil(n / 2), hoch = n <= 4 ? 2 : 3;
  r.style.setProperty('--quer', quer);
  r.style.setProperty('--zquer', Math.ceil(n / quer));
  r.style.setProperty('--hoch', hoch);
  r.style.setProperty('--zhoch', Math.ceil(n / hoch));
  return r;
}

// Drei Schritte, immer an derselben Stelle: Planen → KI-Chat → Spielen
function zeichnePhasen() {
  document.querySelectorAll('.phasen').forEach(leiste => {
    const aktiv = Number(leiste.dataset.aktiv);
    leiste.replaceChildren(...[['idee', 'Planen'], ['chat', 'KI-Chat'], ['start', 'Spielen']].map(([bild, wort], i) => {
      const b = el('button', { type: 'button', class: 'phase', onclick: () => zurPhase(i + 1, aktiv) });
      if (i + 1 === aktiv) b.setAttribute('aria-current', 'step');
      b.innerHTML = `<b>${i + 1}</b>${symbol(bild)}`;
      b.append(el('span', {}, wort));
      return b;
    }));
  });
}
function zurPhase(ziel, von) {
  if (ziel === von) return;
  if (ziel === 1) { if (chat.open) chat.close(); if (spiel.open) spiel.close(); }
  else if (ziel === 2) chatOeffnen();
  else if (von === 2) einfuegenUndSpielen();   // aus dem Chat: kopierten Code gleich starten
  else mein();
}

function gehe(n) {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  stand.schritt = Math.min(Math.max(n, 0), FERTIG);
  merken();
  zeige(true);
}
function waehle(s, i) {
  const w = [...s.wahl, EIGEN][i];
  const id = w === EIGEN ? 'eigen' : w[0];
  if (s.mehrfach) {
    const v = stand.wahl[s.id] || [];
    stand.wahl[s.id] = v.includes(id) ? v.filter(x => x !== id) : [...v, id];
  } else stand.wahl[s.id] = id;
  merken();
  zeige(false);
  if (w === EIGEN && ist(s, w)) $('eigen').focus();
  else $('inhalt').querySelectorAll('.wahl')[i].focus({ preventScroll: true });
}

// ---------- AIS-Chat: QR-Code scannen, Chat bleibt in der App ----------
const chat = $('chatFenster');
const video = $('kamera');
let strom = null;
let scanNr = 0;   // jeder neue Scan oder Stopp macht ältere Kamera-Anfragen ungültig

// Nur Adressen des AIS-Chats werden geladen, fremde QR-Codes nicht
function chatAdresse(text) {
  try {
    const u = new URL(text.trim());
    return u.protocol === 'https:' && (u.hostname === 'ais-chat.schule' || u.hostname.endsWith('.ais-chat.schule')) ? u.href : '';
  } catch (e) { return ''; }
}
function stoppeKamera() {
  scanNr++;
  if (strom) strom.getTracks().forEach(t => t.stop());
  strom = null;
  video.srcObject = null;
  $('scanner').hidden = true;
}
// Immer nur das zeigen, was gerade dran ist
function chatAnsicht(was) {
  $('scanner').hidden = was !== 'scanner';
  $('keinChat').hidden = was !== 'keinChat';
  $('fremd').hidden = $('anleitung').hidden = was !== 'chat';
  $('btnNeuScan').hidden = was !== 'chat';
  setzeHaken(false);
  $('btnCode').hidden = was === 'chat';
}
// Unter dem Chat: die Schritte, dann ein Häkchen. Erst danach geht „Spiel starten“.
const AUFTRAEGE = [
  ['kopieren', 'Text einsetzen und senden'],
  ['uhr', 'Warten, bis der Chat fertig ist'],
  ['editor', 'Beim Code auf „Kopieren“ tippen']
];
const ERLEDIGT = 'Dann setze den Haken: Alles erledigt, mein Code ist kopiert.';
function setzeHaken(an) {
  $('btnErledigt').setAttribute('aria-checked', String(an));
  $('btnStarten').disabled = !an;
  const dritte = $('chatFenster').querySelectorAll('.phase')[2];
  if (dritte) dritte.disabled = !an;
}
// Der gescannte Chat wird für heute gemerkt, dann braucht es die Kamera nicht noch einmal
const K_CHAT = 'spiele-schmiede-chat-heute';
const heute = () => new Date().toDateString();
function gemerkterChat() {
  try {
    const m = JSON.parse(speicher.get(K_CHAT));
    return m.tag === heute() ? chatAdresse(m.url) : '';
  } catch (e) { return ''; }
}
function ladeChat(url) {
  stoppeKamera();
  $('chatHinweis').textContent = '';
  $('chatRahmen').src = url;
  chatAnsicht('chat');
}
async function scanne() {
  stoppeKamera();
  const nr = scanNr;
  const hinweis = $('chatHinweis');
  chatAnsicht('scanner');
  hinweis.textContent = '';
  let s;
  try {
    s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    if (nr !== scanNr) { s.getTracks().forEach(t => t.stop()); return; }
    strom = s;
    video.srcObject = s;
    await video.play();
  } catch (e) {
    if (nr !== scanNr) return;
    stoppeKamera();
    chatAnsicht('keinChat');
    hinweis.textContent = 'Die Kamera geht nicht. Erlaube die Kamera oder tippe den Code ein.';
    return;
  }
  const bild = document.createElement('canvas');
  const g = bild.getContext('2d', { willReadFrequently: true });
  const suche = () => {
    if (nr !== scanNr) return;
    if (video.videoWidth) {
      bild.width = video.videoWidth;
      bild.height = video.videoHeight;
      g.drawImage(video, 0, 0);
      const fund = jsQR(g.getImageData(0, 0, bild.width, bild.height).data, bild.width, bild.height);
      if (fund && fund.data) {
        const url = chatAdresse(fund.data);
        if (url) { speicher.set(K_CHAT, JSON.stringify({ tag: heute(), url })); ladeChat(url); return; }
        hinweis.textContent = 'Das ist kein Code vom AIS-Chat.';
      }
    }
    setTimeout(suche, 200);
  };
  suche();
}
function chatOeffnen() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (fenster.open) fenster.close();
  if (spiel.open) spiel.close();
  if (!chat.open) chat.showModal();
  if ($('chatRahmen').getAttribute('src')) chatAnsicht('chat');   // ein offener Chat bleibt erhalten
  else if (gemerkterChat()) ladeChat(gemerkterChat());
  else scanne();
}
chat.addEventListener('close', stoppeKamera);
document.addEventListener('visibilitychange', () => { if (document.hidden && strom) { stoppeKamera(); chatAnsicht('keinChat'); } });
$('btnNeuScan').onclick = scanne;
$('btnErledigt').onclick = () => {
  setzeHaken($('btnErledigt').getAttribute('aria-checked') !== 'true');
};
$('auftragTon').onclick = () => vorlesen(AUFTRAEGE.map((a, i) => `${i + 1}. ${a[1]}.`).join(' ') + ' ' + ERLEDIGT);
$('auftraege').replaceChildren(...AUFTRAEGE.map(([bild, text], i) => {
  const li = el('li');
  li.innerHTML = `<b>${i + 1}</b>${symbol(bild)}`;
  li.append(el('span', {}, text));
  return li;
}));
$('btnScan').onclick = scanne;
$('btnCode').onclick = () => ladeChat(CHAT_URL);

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
  const bilder = el('div', { class: 'raster fehler' });
  const zeichne = () => bilder.replaceChildren(...FEHLER.map((f, i) => kachel(f, aktiv.has(i), () => {
    aktiv.has(i) ? aktiv.delete(i) : aktiv.add(i);
    meldung.textContent = '';
    zeichne();
    bilder.querySelectorAll('.wahl')[i].focus({ preventScroll: true });
  })));
  zeichne();
  const mehr = el('textarea', { id: 'mehr', placeholder: 'Was soll anders sein?' });
  const abschicken = () => {
    const probleme = FEHLER.filter((f, i) => aktiv.has(i)).map(f => '- ' + f[2]);
    if (mehr.value.trim()) probleme.push('- ' + mehr.value.trim());
    if (!probleme.length) { meldung.textContent = 'Tippe zuerst auf ein Bild.'; return; }
    kopieren(`Bitte verbessere mein Spiel:\n${probleme.join('\n')}\nGib mir wieder das ganze Spiel in einem Codeblock.`, meldung);
    chatOeffnen();
  };
  oeffne('Was soll anders sein?', bilder, el('h3', {}, el('label', { for: 'mehr' }, 'Noch etwas?')), mehr,
    el('div', { class: 'reihe' }, knopf('Weiter zum KI-Chat', 'weiter', 'gruen gross', abschicken)), meldung);
}

function lehrkraft() {
  oeffne('Für Lehrkräfte',
    el('h3', {}, 'Lernszenario im AIS-Chat anlegen'),
    el('p', {}, 'Lege im AIS-Chat ein neues Lernszenario an. Kopiere jeden Text in das Feld mit derselben Überschrift. Beim Sprachmodell kannst du die Voreinstellung lassen. Zeige den Kindern dann den QR-Code des Lernszenarios.'),
    ...SZENARIO.flatMap(([name, text]) => {
      const m = el('span', { role: 'status' });
      return [el('h3', {}, name),
        el('details', {}, el('summary', {}, 'Text ansehen'), el('pre', {}, text)),
        el('div', { class: 'reihe links' }, knopf('Kopieren', 'kopieren', 'leise', () => kopieren(text, m)), m)];
    }));
}

document.querySelectorAll('[data-symbol]').forEach(b => b.insertAdjacentHTML('afterbegin', symbol(b.dataset.symbol)));
$('frageTon').onclick = () => vorlesen($('frage').textContent);
$('btnZurueck').onclick = () => gehe(stand.schritt - 1);
$('btnWeiter').onclick = () => gehe(stand.schritt + 1);
$('btnTasten').onclick = tastenTest;
$('btnKaputt').onclick = hilfe;
$('btnLehrer').onclick = lehrkraft;
$('fensterZu').onclick = () => fenster.close();
zeichnePhasen();
zeige(false);
