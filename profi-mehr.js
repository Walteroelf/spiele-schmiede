'use strict';
// Weitere Profi-Auswahl, damit jeder Schritt ähnlich viele Möglichkeiten hat.
const MEHR = {
  figur: [['drache', 'Drache', 'ein freundlicher Drache'], ['geist', 'Geist', 'ein lustiger Geist'], ['frosch', 'Frosch', 'ein Frosch'], ['einer', 'Mensch', 'ein Mensch, den ich selbst gestalten kann'],
    ['alien', 'Alien', 'ein freundliches Alien'], ['schmetterling', 'Schmetterling', 'ein Schmetterling'], ['flugzeug', 'Flugzeug', 'ein Flugzeug']],
  welt: [['wueste', 'Wüste', 'in der Wüste'], ['nacht', 'Nacht', 'bei Nacht mit Mond und Sternen'], ['hoehle', 'Höhle', 'in einer Höhle'], ['zimmer', 'Zimmer', 'in einem Kinderzimmer'], ['insel', 'Insel', 'auf einer Insel']],
  ding: [['diamant', 'Diamanten', 'Diamanten'], ['abenteuer', 'Schlüssel', 'Schlüssel'], ['geschenk', 'Geschenke', 'Geschenke'], ['blume', 'Blumen', 'Blumen'],
    ['pizza', 'Pizza', 'Pizzastücke'], ['musik', 'Noten', 'Musiknoten'], ['fisch', 'Fische', 'Fische'], ['funken', 'Zaubersterne', 'seltene Zaubersterne, die mehr Punkte geben'], ['zufall', 'Gemischt', 'verschiedene Dinge mit unterschiedlich vielen Punkten']],
  gefahr: [['wasser', 'Wasser', 'Wasser, in das ich falle'], ['feuer', 'Feuer', 'Feuer, das ich berühre'], ['loch', 'Löcher', 'Löcher, in die ich falle'], ['kaktus', 'Kakteen', 'Kakteen, die ich berühre'],
    ['uhr', 'Zeit um', 'abgelaufene Zeit'], ['wand', 'Wände', 'Wände, gegen die ich stoße'], ['blitz', 'Gewitter', 'Gewitterwolken mit Vorwarnung, ohne grelles Blitzen'], ['geist', 'Geister', 'Geister, die mich berühren'], ['pizza', 'Falsches', 'das Einsammeln der falschen Dinge']],
  leben: [['einer', '1 Leben', 'ist das Spiel sofort verloren.'], ['zehn', '10 Leben', 'verliere ich 1 von 10 Leben. Ohne Leben ist das Spiel verloren.'], ['balken', 'Energie', 'sinkt ein Energiebalken. Ist er leer, ist das Spiel verloren.'],
    ['uhr', 'Zeit weg', 'verliere ich 5 Sekunden Zeit.'], ['langsam', 'Langsamer', 'wird meine Figur kurz langsamer.'], ['klein', 'Kleiner', 'wird meine Figur kleiner. Beim dritten Mal ist das Spiel verloren.'],
    ['flagge', 'Speicherpunkt', 'geht es am letzten Speicherpunkt weiter.'], ['quiz', 'Rettungsfrage', 'kommt eine leichte Bilder-Frage. Ist sie richtig, geht es ohne Verlust weiter.'], ['doppelt', 'Punkte halb', 'verliere ich die Hälfte meiner Punkte.']],
  ziel: [['zwanzig', '20 Punkte', 'Bei 20 Punkten habe ich gewonnen.'], ['fuenfzig', '50 Punkte', 'Bei 50 Punkten habe ich gewonnen.'], ['abenteuer', 'Schatz', 'Gewonnen habe ich, wenn ich den Schlüssel und dann den Schatz gefunden habe.'],
    ['schild', 'Durchhalten', 'Gewonnen habe ich, wenn ich 2 Minuten durchhalte.'], ['sammeln', 'Alles sammeln', 'Gewonnen habe ich, wenn alles eingesammelt ist.']],
  tasten: [['hoch', 'Nur hoch', 'nur Pfeil hoch.'], ['hochrunter', 'Hoch + runter', 'nur Pfeil hoch und Pfeil runter.'], ['dreiq', 'Quer + Leer', 'Pfeil links, Pfeil rechts und die Leertaste.'],
    ['dreih', 'Hoch + Leer', 'Pfeil hoch, Pfeil runter und die Leertaste.'], ['wasd', 'W A S D', 'die Tasten W, A, S und D (Rückseite des MakeyMakey).'], ['sechs', 'W A S D F G', 'die Tasten W, A, S, D, F und G (Rückseite des MakeyMakey).'],
    ['finger', 'Nur Tippen', 'keine Tasten, nur Antippen und Wischen auf dem Bildschirm.']],
  knoepfe: [['finger', 'Steuerknöpfe', 'Steuerung zum Antippen'], ['quiz', 'Hilfe', 'Hilfe mit Bildern'], ['karte', 'Menü', 'zurück zum Hauptmenü'], ['treppe', 'Level wählen', 'Level wählen'],
    ['regler', 'Tempo ändern', 'Tempo ändern'], ['musik', 'Musik aus', 'Musik getrennt an und aus'], ['bild', 'Vollbild', 'Vollbild']],
  level: [['drei', '3 Runden', 'drei kurze Runden mit Zwischenstand'], ['zehn', '10 Level', 'zehn Level, die nach und nach neue Dinge bringen'], ['unendlich', 'Endlos', 'endlose Stufen, die langsam schwerer werden'],
    ['zufall', 'Zufall', 'jedes Mal zufällig neu aufgebaut'], ['himmel', 'Neue Welten', 'jedes Level hat einen neuen Ort'], ['pokal', 'Endrunde', 'am Ende eine besondere Endrunde'], ['abenteuer', 'Freischalten', 'neue Level und Figuren werden freigeschaltet'], ['nacht', 'Tag und Nacht', 'zwischen Tag und Nacht wechselnd']],
  tempo: [['uhr', 'Sehr langsam', 'sehr langsam, viel Zeit zum Reagieren'], ['treppe', 'Je Level', 'in jedem Level etwas schneller'], ['wackeln', 'Wechselnd', 'abwechselnd langsame und schnelle Abschnitte'], ['punkte', 'Nach Punkten', 'mit mehr Punkten schneller'],
    ['pause', 'Zug um Zug', 'ohne Zeitdruck: das Spiel wartet auf meinen Tastendruck'], ['herz', 'Passt sich an', 'passt sich an: nach Fehlern langsamer, bei Erfolg schneller'], ['rakete', 'Turbo', 'sehr schnell']],
  bewegung: [['rennen', 'Immer vorwärts', 'ständig vorwärts wie in einem Rennen'], ['rakete', 'Fliegen', 'fliegen: Taste hebt die Figur, sonst sinkt sie'], ['wackeln', 'Springt Spuren', 'Wechsel zwischen drei Spuren'], ['neu', 'Drehen', 'drehen und in Blickrichtung fahren'], ['meer', 'Schwimmen', 'weich und träge wie im Wasser']],
  aktion: [['huepfen', 'Springen', 'Springen'], ['neu', 'Teleport', 'an eine sichere Stelle teleportieren'], ['stern', 'Zauberstern', 'einen Zauberstern werfen, der Hindernisse in Blumen verwandelt'], ['klein', 'Schrumpfen', 'kurz klein werden'], ['mauer', 'Brücke bauen', 'eine Brücke oder einen Block bauen'], ['musik', 'Rufen', 'ein Signal, das Gegner kurz anhalten lässt']],
  gegner: [['gruppe', 'In Gruppen', 'kommen in Gruppen mit Lücken'], ['neu', 'Kreisen', 'bewegen sich im Kreis'], ['huepfen', 'Hüpfen', 'hüpfen'], ['rennen', 'Schnell von rechts', 'kommen von der Seite'], ['stumm', 'Verstecken', 'tauchen mit Vorwarnung auf und verschwinden wieder']],
  extras: [['uhr2', 'Extra-Zeit', 'Extra-Zeit'], ['stern', 'Unbesiegbar', 'kurz unbesiegbar'], ['rakete', 'Flug', 'kurz fliegen'], ['zufall', 'Überraschung', 'eine Überraschungskiste']],
  anzeigen: [['muenze', 'Münzen', 'gesammelte Münzen'], ['karte', 'Minikarte', 'eine kleine Karte'], ['schild', 'Extras aktiv', 'aktive Extras mit Restzeit'], ['figuren', 'Spielername', 'ein selbst gewähltes Fantasie-Symbol für mich'], ['minus', 'Fehler', 'Anzahl der Fehler']],
  spieler: [['herz', 'Gemeinsam', 'zwei Personen helfen sich gegenseitig'], ['gruppe', 'Gruppe', 'bis zu vier Personen nacheinander mit Siegertafel'], ['geist', 'Gegen Schatten', 'ich gegen den Schatten meiner letzten Runde'],
    ['uhr', 'Gegen Zeit', 'allein gegen die Uhr'], ['hund', 'Mit Helfer', 'allein mit einer Helferfigur, die vom Computer gesteuert wird'], ['pokal', 'Turnier', 'Turnier in mehreren Runden'], ['tasten', 'Geteilte Tasten', 'zwei Personen steuern gemeinsam eine Figur, jede hat eigene Tasten']],
  stil: [['stein', 'Knete', 'wie aus Knete geformt'], ['kopieren', 'Papier', 'wie aus buntem Papier ausgeschnitten'], ['nacht', 'Dunkel', 'dunkler Hintergrund mit hellen Formen'], ['blume', 'Bunt', 'sehr bunt und fröhlich'], ['editor', 'Strichbild', 'schlichte Strichzeichnung'], ['bild', 'Emoji', 'große Emojis als Figuren']],
  effekte: [['stern', 'Konfetti', 'Konfetti beim Gewinnen'], ['nacht', 'Wetter', 'Wetter wie Regen oder Schnee'], ['klein', 'Zoom', 'sanftes Heranzoomen beim Levelwechsel'], ['punkte', 'Punkte fliegen', 'Zahlen steigen beim Sammeln auf'], ['neu', 'Drehen', 'Dinge drehen und wippen'], ['haken', 'Keine', 'keine Effekte, ruhiges Bild']],
  klang: [['stern', 'Sammelton', 'ein heller Ton beim Sammeln'], ['minus', 'Fehlerton', 'ein sanfter Ton bei Fehlern'], ['chat', 'Stimme', 'die Sprachausgabe sagt kurze Ansagen'], ['huepfen', 'Sprungton', 'ein Ton beim Springen'], ['rennen', 'Schnellere Musik', 'die Musik wird mit dem Tempo schneller'], ['katze', 'Tierlaute', 'lustige selbst erzeugte Tierlaute'], ['regler', 'Lautstärke', 'Lautstärke einstellbar']],
  bilder: [['himmel', 'Ort wählen', 'Ort auswählen'], ['pokal', 'Siegertafel', 'Siegertafel'], ['karte', 'Level-Karte', 'Level-Karte'], ['pause', 'Pausen-Bild', 'Pausen-Bild'], ['chat', 'Geschichte', 'kurze Bildergeschichte am Anfang'], ['pinsel', 'Farbe wählen', 'Farbe der Figur wählen'], ['herz', 'Danke-Bild', 'Abschlussbild „Gemacht von mir“']]
};
for (const [id, liste] of Object.entries(MEHR)) {
  const eigener = PROFI_SCHRITTE.find(x => x.s.id === id);
  if (eigener) eigener.s.wahl.push(...liste);
  else PROFI_WAHL[id] = [...(PROFI_WAHL[id] || []), ...liste];
}

Object.assign(SYMBOLE, {
  drache: p('M3 18c4 2 12 3 13-3l5-2-3-3V5l-3 4-3-4v6c-4 0-4 5-9 7zM15 12h.100'),
  geist: p('M5 21V11a7 7 0 0 1 14 0v10l-2.500-2-2.300 2-2.200-2-2.200 2-2.300-2zM9 10h.100M15 10h.100'),
  frosch: c(7, 7, 3) + c(17, 7, 3) + p('M4 10c-3 14 19 14 16 0M8 15q4 3 8 0'),
  alien: p('M12 3C2 3 3 12 12 21c9-9 10-18 0-18zM7 10l3 3M17 10l-3 3'),
  schmetterling: p('M12 6v14M12 11C9 2 1 4 3 10c1 3 5 3 9 1-8 1-7 11 0 7M12 11c3-9 11-7 9-1-1 3-5 3-9 1 8 1 7 11 0 7M10 3l2 3 2-3'),
  flugzeug: p('M12 2c2 0 2 3 2 7l8 5v3l-8-3v4l3 3v1l-5-1.500L7 22v-1l3-3v-4l-8 3v-3l8-5c0-4 0-7 2-7z'),
  wueste: c(18, 6, 3) + p('M2 20q6-8 12-2 4-4 8 0M2 21h20'),
  nacht: p('M15 3a8 8 0 1 0 6 12 7 7 0 0 1-6-12zM4 4v3M2.500 5.500h3'),
  hoehle: p('M2 21C3 1 21 1 22 21zM8 21c0-10 8-10 8 0'),
  zimmer: p('M3 11l9-8 9 8v10H3zM9 21v-6h6v6'),
  insel: p('M2 19q2.500-2 5 0t5 0 5 0 5 0M6 17c2-5 10-5 12 0M12 13V6M12 6C9 3 6 5 6 7M12 6c3-3 6-1 6 1'),
  diamant: p('M6 4h12l4 6-10 11L2 10zM2 10h20M9 10l3 11 3-11-3-6z'),
  blume: c(12, 9, 2.5) + c(12, 4, 2.5) + c(17, 9, 2.5) + c(12, 14, 2.5) + c(7, 9, 2.5) + p('M12 16v6'),
  pizza: p('M3 6c6-4 12-4 18 0l-9 16zM9 9h.100M14 10h.100M12 15h.100'),
  wasser: p('M12 2C7 9 5 12 5 15a7 7 0 0 0 14 0c0-3-2-6-7-13z'),
  feuer: p('M12 22c-5 0-7-3-7-7 0-5 5-7 5-13 5 4 9 8 9 13 0 4-2 7-7 7zM12 22c-4-3-1-6 0-9 3 3 4 7 0 9z'),
  loch: '<ellipse cx="12" cy="14" rx="10" ry="5"/><ellipse cx="12" cy="15" rx="6" ry="2.5" fill="currentColor"/>',
  kaktus: p('M10 21V5a2 2 0 0 1 4 0v16M10 14H6V8M14 11h4V6M6 21h12'),
  wand: p('M3 4h18v16H3zM3 9.500h18M3 14.500h18M9 4v5.500M15 9.500v5M9 14.500V20'),
  blitz: p('M6 12a4 4 0 0 1 0-8 5 5 0 0 1 10 0 4 4 0 0 1 2 8M13 11l-4 6h4l-2 5'),
  zwanzig: p('M3 8c1-6 9-4 6 1l-6 9h8') + '<rect x="14" y="6" width="7" height="12" rx="3.5"/>',
  fuenfzig: p('M9 6H4v5c7-2 8 8 0 7') + '<rect x="14" y="6" width="7" height="12" rx="3.5"/>',
  hochrunter: p('M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5'),
  dreiq: p('M8 5L2 9l6 4zM16 5l6 4-6 4z') + '<rect x="4" y="17" width="16" height="4" rx="2"/>',
  dreih: p('M12 2l4 5H8zM12 15l-4-5h8z') + '<rect x="4" y="18" width="16" height="4" rx="2"/>',
  wasd: p('M8 3h8v8H8zM2 13h6v8H2zM9 13h6v8H9zM16 13h6v8h-6z'),
  sechs: p('M2 5h6v6H2zM9 5h6v6H9zM16 5h6v6h-6zM2 13h6v6H2zM9 13h6v6H9zM16 13h6v6h-6z'),
  finger: p('M9 13V5a2 2 0 0 1 4 0v6l5 1c2 .500 2 2 1.500 4L18 21h-7l-6-7c-1-2 2-3 4-1z'),
  uhr2: c(10, 13, 7) + p('M10 9v4l3 2M19 3v6M16 6h6'),
  gruppe: c(12, 7, 3) + c(5, 11, 2.5) + c(19, 11, 2.5) + p('M7 21c0-9 10-9 10 0M1 20c0-5 5-6 7-3M23 20c0-5-5-6-7-3')
});
