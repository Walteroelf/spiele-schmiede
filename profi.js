'use strict';
// Profi-Modus: zusätzliche Auswahl in bestehenden Schritten und eigene Profi-Schritte.
// Aufbau wie in app.js: [Symbol, Wort auf der Kachel, Satzteil für den Prompt]
const PROFI_WAHL = {
  spiel: [
    ['rennen', 'Rennen', 'Renn-Spiel: Strecke mit Kurven, Hindernissen und Rundenzeit'],
    ['schlange', 'Schlange', 'Schlangen-Spiel: meine Figur wird beim Sammeln immer länger'],
    ['mauer', 'Mauerball', 'Mauerball: mit einem Schläger einen Ball halten und Steine abräumen'],
    ['tennis', 'Tennis', 'Tennis von oben: Ball hin und her spielen'],
    ['kisten', 'Kisten schieben', 'Schiebe-Rätsel: Kisten auf Zielfelder schieben, mehrere Rätsel'],
    ['turm', 'Turm bauen', 'Stapel-Spiel: Blöcke im richtigen Moment ablegen und hoch bauen'],
    ['abenteuer', 'Abenteuer', 'Abenteuer: mehrere Räume, Schlüssel finden, Türen öffnen']
  ],
  welt: [['burg', 'Burg', 'in einer Burg'], ['eisberg', 'Eisland', 'im Eisland'], ['vulkan', 'Vulkan', 'an einem Vulkan'], ['dschungel', 'Dschungel', 'im Dschungel']],
  ziel: [['pokal', 'Endgegner', 'Gewonnen habe ich, wenn ich den großen Endgegner überlistet habe. Keine Gewalt.'], ['flagge', 'Zielfahne', 'Gewonnen habe ich, wenn ich die Zielfahne erreiche.']],
  level: [['fuenf', '5 Level', 'fünf Level mit neuen Hindernissen und Anzeige „Level geschafft“'], ['karte', 'Level-Karte', 'eine Karte, auf der ich das nächste Level sehe und auswähle']],
  tempo: [['regler', 'Selbst wählen', 'vor dem Start wähle ich langsam, mittel oder schnell']]
};

const schritt = (id, symbol, frage, zeile, mehrfach, wahl) => ({ id, symbol, frage: mehrfach ? frage + ' (mehrere möglich)' : frage, zeile, mehrfach, wahl, profi: true });
// nach: hinter welchem Schritt der Profi-Schritt erscheint
const PROFI_SCHRITTE = [
  { nach: 'figur', s: schritt('bewegung', 'vier', 'Wie bewegt sich die Figur?', 'Bewegung', false, [
    ['zwei', 'Hin und her', 'nur nach links und rechts'], ['vier', 'Alle Richtungen', 'frei in alle Richtungen'],
    ['schwung', 'Mit Schwung', 'mit Beschleunigen und Ausrutschen'], ['huepfen', 'Schwerkraft', 'laufen und springen mit Schwerkraft und Plattformen'],
    ['mittel', 'Läuft selbst', 'die Figur läuft von allein, ich lenke oder springe'], ['gitter', 'Feld für Feld', 'Schritt für Schritt auf einem Gitter']]) },
  { nach: 'bewegung', s: schritt('aktion', 'schnell', 'Welche Spezial-Aktion?', 'Spezial-Aktion (mit einer freien erlaubten Taste, sonst mit einem Knopf zum Antippen)', true, [
    ['doppel', 'Doppelsprung', 'Doppelsprung'], ['schnell', 'Turbo', 'kurzer Turbo mit Aufladezeit'], ['schild', 'Schutzschild', 'Schutzschild mit Aufladezeit'],
    ['magnet', 'Magnet', 'Magnet, der Punkte anzieht'], ['uhr', 'Zeitlupe', 'Zeitlupe mit Aufladezeit']]) },
  { nach: 'gefahr', s: schritt('gegner', 'roboter', 'Wie verhalten sich die Hindernisse?', 'Verhalten der Hindernisse und Gegner', true, [
    ['runter', 'Fallen', 'fallen von oben'], ['pendeln', 'Hin und her', 'bewegen sich hin und her'], ['verfolgen', 'Verfolgen', 'verfolgen meine Figur langsam'],
    ['zufall', 'Zufällig', 'bewegen sich zufällig'], ['gross', 'Werden größer', 'werden mit der Zeit größer'], ['pokal', 'Endgegner', 'am Ende kommt ein großer Endgegner mit eigenem Muster']]) },
  { nach: 'gegner', s: schritt('extras', 'geschenk', 'Welche Extras kann man einsammeln?', 'Extras zum Einsammeln', true, [
    ['herz', 'Extra-Leben', 'Extra-Leben'], ['doppelt', 'Doppelte Punkte', 'doppelte Punkte für kurze Zeit'], ['schild', 'Schild', 'Schutzschild'],
    ['uhr', 'Zeitlupe', 'Zeitlupe'], ['magnet', 'Magnet', 'Magnet'], ['gross', 'Riesig', 'meine Figur wird kurz riesig'], ['haken', 'Keine', 'keine']]) },
  { nach: 'knoepfe', s: schritt('anzeigen', 'balken', 'Was soll oben angezeigt werden?', 'Anzeigen oben', true, [
    ['stern', 'Punkte', 'Punkte'], ['herz', 'Leben', 'Leben'], ['uhr', 'Zeit', 'Zeit'], ['treppe', 'Level', 'Level'],
    ['pokal', 'Rekord', 'bester Punktestand'], ['balken', 'Balken', 'Fortschrittsbalken zum Ziel']]) },
  { nach: 'tempo', s: schritt('spieler', 'zweispieler', 'Wer spielt?', 'Spieler', false, [
    ['einer', 'Allein', 'eine Person'], ['zweispieler', 'Abwechselnd', 'zwei Personen abwechselnd mit Punktevergleich'],
    ['tennis', 'Gleichzeitig', 'zwei Personen gleichzeitig; teile die erlaubten Tasten gerecht auf'], ['roboter', 'Gegen Computer', 'ich gegen den Computer']]) },
  { nach: 'spieler', s: schritt('stil', 'pinsel', 'Wie sieht es aus?', 'Grafik-Stil', false, [
    ['pinsel', 'Comic', 'Comic mit dicken Umrissen, selbst gezeichnet'], ['gitter', 'Pixel', 'Pixel-Grafik wie in alten Spielen'], ['neon', 'Neon', 'leuchtende Neon-Farben auf dunklem Grund'],
    ['kontrast', 'Klar', 'sehr starke Kontraste, große einfache Formen'], ['kisten', '3D-Wirkung', 'mit Schatten und Tiefenwirkung']]) },
  { nach: 'stil', s: schritt('effekte', 'funken', 'Welche Effekte?', 'Effekte', true, [
    ['funken', 'Funken', 'Funken beim Sammeln'], ['wackeln', 'Wackeln', 'kurzes sanftes Wackeln bei Fehlern, ohne Blitzen'], ['rennen', 'Spur', 'eine Spur hinter der Figur'],
    ['himmel', 'Hintergrund', 'bewegter Hintergrund in mehreren Ebenen'], ['figuren', 'Animationen', 'animierte Figuren']]) },
  { nach: 'effekte', s: schritt('klang', 'musik', 'Was hört man?', 'Klang (ohne Tondateien erzeugt)', true, [
    ['ton', 'Geräusche', 'Geräusche bei Aktionen'], ['musik', 'Musik', 'eine ruhige Melodie im Hintergrund'], ['pokal', 'Fanfare', 'Fanfare beim Gewinnen'], ['stumm', 'Still', 'keine Töne']]) },
  { nach: 'klang', s: schritt('bilder', 'bild', 'Welche Zusatz-Bildschirme?', 'Zusätzliche Bildschirme', true, [
    ['figuren', 'Figur wählen', 'Figur auswählen'], ['schwer', 'Stufe wählen', 'Schwierigkeit wählen'], ['quiz', 'Anleitung', 'Anleitung in Bildern'], ['stern', 'Sterne am Ende', 'Endbild mit 1 bis 3 Sternen']]) }
];

const PROFI_AUFTRAG = 'Profi-Spiel: Programmiere ein ausgefeiltes, umfangreiches Spiel. Der Code darf lang sein, muss aber vollständig sein. Nutze eine Spielschleife mit requestAnimationFrame, zeitabhängige flüssige Bewegung, saubere Kollisionen, klare Zustände (Start, Spiel, Pause, Ende) und lege alle Einstellungen gut kommentiert an den Anfang des Skripts. Prüfe, dass jede gewählte Funktion wirklich funktioniert.';

Object.assign(SYMBOLE, {
  rennen: p('M3 7h8M2 12h6M3 17h8') + p('M13 5l8 7-8 7z'),
  schlange: p('M4 19h9a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7') + c(19, 7, 2),
  mauer: p('M3 4h8v4H3zM13 4h8v4h-8zM8 10h8v4H8zM7 20h10') + c(12, 17, 1),
  tennis: p('M4 5v8M20 11v8') + c(12, 12, 2),
  kisten: p('M12 3l8 4v10l-8 4-8-4V7zM4 7l8 4 8-4M12 11v10'),
  turm: p('M7 17h10v4H7zM6 12h10v5H6zM9 7h9v5H9zM8 3h8'),
  abenteuer: c(7, 12, 4) + p('M11 12h10M17 12v4M21 12v3'),
  burg: p('M4 21V5h3v3h3V5h4v3h3V5h3v16zM10 21v-5a2 2 0 0 1 4 0v5'),
  eisberg: p('M2 15h20M6 15l4-9 3 4 2-3 4 8M5 19h4M13 20h6'),
  vulkan: p('M2 21l7-12h6l7 12zM12 6V2M8 6L6 3M16 6l2-3'),
  dschungel: p('M12 21V10M12 10C8 3 3 5 2 9c4-2 7-1 10 1zM12 10c4-7 9-5 10-1-4-2-7-1-10 1z'),
  pokal: p('M8 4h8v6a4 4 0 0 1-8 0zM8 6H4c0 4 2 5 4 5M16 6h4c0 4-2 5-4 5M12 14v4M8 21h8M9 18h6'),
  flagge: p('M6 22V3M6 4h12l-3 4 3 4H6'),
  fuenf: p('M16 4H8v7c10-3 11 10 0 9'),
  karte: p('M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15'),
  regler: p('M3 7h18M3 17h18') + c(8, 7, 3) + c(16, 17, 3),
  schwung: p('M3 18c4 0 4-12 9-12s4 8 9 8M17 11l4 3-4 3'),
  gitter: p('M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18'),
  doppel: p('M6 11l6-6 6 6M6 18l6-6 6 6'),
  schild: p('M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z'),
  magnet: p('M5 4v8a7 7 0 0 0 14 0V4h-5v8a2 2 0 0 1-4 0V4zM5 8h5M14 8h5'),
  pendeln: p('M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4'),
  verfolgen: c(18, 12, 3) + p('M3 12h10M10 8l4 4-4 4'),
  zufall: p('M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3'),
  gross: p('M14 4h6v6M20 4l-7 7M4 14h7v6H4z'),
  geschenk: p('M4 10h16v11H4zM3 7h18v3H3zM12 7v14M12 7C7 7 6 2 9 3s3 4 3 4 0-3 3-4 2 4-3 4'),
  doppelt: p('M3 8l7 8M10 8l-7 8M14 10c1-4 7-3 6 1l-6 6h7'),
  balken: p('M3 9h18v6H3zM6 12h8'),
  einer: c(12, 7, 4) + p('M4 21c0-10 16-10 16 0'),
  zweispieler: c(8, 8, 3) + c(17, 9, 3) + p('M2 20c0-8 12-8 12 0M15 14c4-1 7 1 7 6'),
  pinsel: p('M20 4L10 14M10 14c-5-1-3 6-7 6 6 3 11-1 10-4z'),
  neon: c(12, 12, 4) + p('M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3'),
  kontrast: c(12, 12, 9) + '<path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
  funken: p('M8 3l1.500 5L14 9.500 9.500 11 8 16l-1.500-5L2 9.500 6.500 8zM17 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1z'),
  wackeln: p('M8 5h8v14H8zM4 8l-2 4 2 4M20 8l2 4-2 4'),
  figuren: c(7, 7, 3) + p('M14 4h6v6h-6zM7 14l4 7H3zM17 14l4 3.500-4 3.500-4-3.500z')
});
