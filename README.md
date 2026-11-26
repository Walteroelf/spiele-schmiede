# Spiele-Schmiede

Prompt-Helfer mit Bildern: Kinder planen ein HTML-Spiel für das MakeyMakey, auch ohne lesen und schreiben zu können.

**Öffnen:** https://walteroelf.github.io/spiele-schmiede/

Zu Beginn erscheint eine **Startseite** mit den Schritten für die Lehrperson, dem Link zum AIS-Chat und der Wahl **Standard** oder **Profi**.

## Ablauf

Oben stehen immer die drei Schritte **1 Planen → 2 KI-Chat → 3 Spielen**.

1. In der Spiele-Schmiede Bilder antippen (Spiel, Figur, Ort, Punkte, Fehler, Ziel, Kontakte, Knöpfe, Schwierigkeit, Tempo) oder jeweils eine eigene Idee eingeben.
2. Steckbrief kopieren, **AIS-Chat öffnen**, den QR-Code des Lernszenarios scannen und den Text einfügen. Der Chat erscheint in der App.
3. Code kopieren und **Spiel starten** tippen: Das Spiel startet im Vollbild, das kleine **×** oben rechts beendet es. **Code ansehen** öffnet den eingebauten Editor (Kopie des [HTML-Editors](https://github.com/Walteroelf/html-editor) in `editor/`, mit eigenem Speicher).

Im Chat (lila Rahmen) zeigt die hellblaue Leiste die drei Schritte. Erst mit dem Haken **„Mein Code ist kopiert“** geht **Spiel starten**.

**Ganz ohne Browserleiste:** In Safari auf *Teilen → Zum Home-Bildschirm* tippen und die App über das neue Symbol öffnen.

Der gescannte Chat wird bis zum Ende des Tages gemerkt. **QR-Code** oben rechts im Chat scannt neu.

Oben rechts lässt sich zwischen **Standard** und **Profi** wechseln. Profi hat mehr Spielarten und zusätzliche Schritte zu Bewegung, Aktionen, Gegnern, Extras, Anzeigen, Spielern, Grafik, Effekten, Klang und Bildschirmen (`profi.js`, `profi-mehr.js`). Jeder Schritt hat dort mindestens elf Möglichkeiten und **Selbst erfinden**.

## Für Lehrkräfte

Unter **Lehrkraft** stehen die Texte für das Lernszenario im AIS-Chat. Die Technik-Regeln stehen im Szenario, deshalb bleibt der Steckbrief kurz.

Außerdem gibt es einen **Tasten-Test** für das MakeyMakey und beim Spiel **Code überarbeiten**: Es führt zurück zum Planen, dort lassen sich Auswahl, Fehlerbilder und Wünsche ändern. Vor dem Wechsel in den Chat fragt die App dann, was in den Zwischenspeicher soll: **Nur die Änderung** (Standard) oder **Alles noch einmal** (für einen neuen Chat).

## Datenschutz

Kein Konto, keine eigene KI-Schnittstelle, kein Tracking. Auswahl und eigene Texte bleiben im Browser des Geräts (`localStorage`). Das zuletzt gestartete Spiel wird ebenfalls nur auf dem Gerät gespeichert. Das Kamerabild wird nur auf dem Gerät ausgewertet. Geladen werden ausschließlich QR-Adressen von `ais-chat.schule`; für den Chat gelten dessen Datenschutzregeln. Zum Vorlesen dient die Sprachausgabe des Geräts. Die Seite liegt auf GitHub Pages.

## Lizenz

CC BY-NC-SA 4.0, siehe [LICENSE.md](LICENSE.md). Schrift Andika: SIL Open Font License. QR-Leser [jsQR](https://github.com/cozmo/jsQR) 1.4.0: Apache-Lizenz 2.0, siehe `vendor/`.
