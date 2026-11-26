'use strict';
// Einfügen → Spiel in Großansicht. „Code ansehen“ öffnet die Kopie des HTML-Editors (Ordner editor/).

const K_SPIEL = 'spiele-schmiede-code';
const K_ENTWURF = 'spiele-schmiede-editor:code';   // Entwurf der Editor-Kopie
const spiel = $('spielFenster');
const editorFenster = $('editorFenster');
let spielCode = speicher.get(K_SPIEL) || '';

// Holt das HTML aus dem kopierten Text, auch wenn Erklärsätze oder ``` dabei sind
function htmlAus(text) {
  const block = [...text.matchAll(/```[a-z]*\s*\n([\s\S]*?)```/gi)].map(m => m[1]).find(t => /<[a-z!]/i.test(t));
  const t = (block || text).trim();
  const anfang = t.search(/<!doctype html|<html[\s>]/i);
  if (anfang >= 0) {
    const ende = t.toLowerCase().lastIndexOf('</html>');
    return ende > anfang ? { code: t.slice(anfang, ende + 7) } : { fehler: 'Der Code ist nicht vollständig. Kopiere im Chat den ganzen Code.' };
  }
  if (t.startsWith('<') && /<\/(script|body|div|canvas|style)>/i.test(t)) return { code: t };
  return { fehler: 'Das ist kein Spiel-Code. Tippe im Chat beim Code auf „Kopieren“.' };
}

// Das Spiel läuft abgeschottet (ohne Zugriff auf gespeicherte Daten). Damit Spiele mit
// Highscore trotzdem laufen, bekommen sie einen Speicher, der nur bis zum Neustart hält.
const ERSATZ = '<script>(function(){function S(){var d={};return{getItem:function(k){return k in d?d[k]:null},setItem:function(k,v){d[k]=String(v)},removeItem:function(k){delete d[k]},clear:function(){d={}}}}["localStorage","sessionStorage"].forEach(function(n){try{window[n].length}catch(e){Object.defineProperty(window,n,{value:S()})}})})()<\/script>';
function mitErsatz(code) {
  const m = code.match(/<head[^>]*>/i) || code.match(/<html[^>]*>/i) || code.match(/<!doctype[^>]*>/i);
  const i = m ? m.index + m[0].length : 0;
  return code.slice(0, i) + ERSATZ + code.slice(i);
}

// Für jeden Start ein frischer Rahmen: zweimal schnell neu laden lässt den alten sonst leer
function leererRahmen() {
  const alt = $('spielRahmen');
  const neu = alt.cloneNode(false);
  neu.removeAttribute('srcdoc');
  neu.hidden = true;
  alt.replaceWith(neu);
  return neu;
}
const insSpiel = () => { const f = $('spielRahmen'); f.focus(); try { f.contentWindow.focus(); } catch (e) { /* egal */ } };

function zeigeSpiel() {
  $('einfuegen').hidden = true;
  const f = leererRahmen();
  f.hidden = false;
  f.onload = insSpiel;
  f.srcdoc = mitErsatz(spielCode);
  $('werkzeug').hidden = $('tippHinweis').hidden = false;
  insSpiel();
}
function zeigeEinfuegen(hinweis = '') {
  leererRahmen();
  $('einfuegen').hidden = false;
  $('codeFeld').value = '';
  $('spielHinweis').textContent = hinweis;
  $('werkzeug').hidden = $('tippHinweis').hidden = true;
  $('btnAltes').hidden = !spielCode;
  if (hinweis) vorlesen(hinweis);
}
function uebernehmen(text) {
  const erg = htmlAus(text);
  if (erg.fehler) { zeigeEinfuegen(erg.fehler); return; }
  spielCode = erg.code;
  speicher.set(K_SPIEL, spielCode);
  zeigeSpiel();
}
async function ausZwischenablage() {
  let text = '';
  try { text = await navigator.clipboard.readText(); } catch (e) { /* nicht erlaubt */ }
  if (!spiel.open) return;
  if (text.trim()) uebernehmen(text);
  else zeigeEinfuegen('Tippe in das große Feld und wähle „Einsetzen“.');
}
function spielOeffnen() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (fenster.open) fenster.close();
  if (chat.open) chat.close();   // der Chat bleibt geladen
  if (!spiel.open) spiel.showModal();
}

// „Spiel starten“ nach dem Kopieren: sofort einfügen und spielen
function einfuegenUndSpielen() { spielOeffnen(); zeigeEinfuegen(); ausZwischenablage(); }
$('btnStarten').onclick = einfuegenUndSpielen;
$('btnEinfuegen').onclick = ausZwischenablage;
$('codeFeld').addEventListener('paste', e => {
  const text = e.clipboardData && e.clipboardData.getData('text/plain');
  if (text) { e.preventDefault(); uebernehmen(text); }
});
$('codeFeld').addEventListener('input', e => { if (/<\/html>/i.test(e.target.value)) uebernehmen(e.target.value); });
const mein = () => { spielOeffnen(); spielCode ? zeigeSpiel() : zeigeEinfuegen(); };
$('btnAltes').onclick = zeigeSpiel;
$('btnNochmal').onclick = zeigeSpiel;
$('btnNeuerCode').onclick = einfuegenUndSpielen;
spiel.addEventListener('close', () => { if (!spiel.open) leererRahmen(); });   // Ton und Zeit stoppen

$('btnAnsehen').onclick = () => {
  speicher.set(K_ENTWURF, spielCode);
  leererRahmen();
  $('editorRahmen').src = 'editor/index.html#entwurf';
  editorFenster.showModal();
};
$('editorZu').onclick = () => editorFenster.close();
editorFenster.addEventListener('close', () => {
  $('editorRahmen').src = 'about:blank';
  const neu = speicher.get(K_ENTWURF);   // im Editor geänderten Code übernehmen
  if (neu && neu.trim()) { spielCode = neu; speicher.set(K_SPIEL, neu); }
  zeigeSpiel();
});
