# Spiele-Schmiede

Prompt-Helfer mit Bildern: Kinder planen ein HTML-Spiel für das MakeyMakey, auch ohne lesen und schreiben zu können.

**Öffnen:** https://walteroelf.github.io/spiele-schmiede/

## Ablauf

Oben stehen immer die drei Schritte **1 Planen → 2 KI-Chat → 3 Spielen**.

1. In der Spiele-Schmiede Bilder antippen (Spiel, Figur, Ort, Punkte, Ziel, Kontakte, Tempo) oder jeweils eine eigene Idee eingeben.
2. Steckbrief kopieren, **AIS-Chat öffnen**, den QR-Code des Lernszenarios scannen und den Text einfügen. Der Chat erscheint in der App.
3. Code kopieren und **Spiel starten** tippen: Das Spiel startet im Vollbild, oben rechts führt **Menü** zurück. **Code ansehen** öffnet den eingebauten Editor (Kopie des [HTML-Editors](https://github.com/Walteroelf/html-editor) in `editor/`, mit eigenem Speicher).

Im Chat (lila Rahmen) zeigt die hellblaue Leiste die drei Schritte. Erst mit dem Haken **„Mein Code ist kopiert“** geht **Spiel starten**.

**Ganz ohne Browserleiste:** In Safari auf *Teilen → Zum Home-Bildschirm* tippen und die App über das neue Symbol öffnen.

Der gescannte Chat wird bis zum Ende des Tages gemerkt. **QR-Code** oben rechts im Chat scannt neu.

## Für Lehrkräfte

Unter **Lehrkraft** stehen die Texte für das Lernszenario im AIS-Chat. Die Technik-Regeln stehen im Szenario, deshalb bleibt der Steckbrief kurz.

Außerdem gibt es einen **Tasten-Test** für das MakeyMakey und **Klappt nicht**, das mit Bildern einen Verbesserungs-Text baut.

## Datenschutz

Kein Konto, keine eigene KI-Schnittstelle, kein Tracking. Auswahl und eigene Texte bleiben im Browser des Geräts (`localStorage`). Das zuletzt gestartete Spiel wird ebenfalls nur auf dem Gerät gespeichert. Das Kamerabild wird nur auf dem Gerät ausgewertet. Geladen werden ausschließlich QR-Adressen von `ais-chat.schule`; für den Chat gelten dessen Datenschutzregeln. Zum Vorlesen dient die Sprachausgabe des Geräts. Die Seite liegt auf GitHub Pages.

## Lizenz

CC BY-NC-SA 4.0, siehe [LICENSE.md](LICENSE.md). Schrift Andika: SIL Open Font License. QR-Leser [jsQR](https://github.com/cozmo/jsQR) 1.4.0: Apache-Lizenz 2.0, siehe `vendor/`.
