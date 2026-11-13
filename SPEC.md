# SPEC: Lernwelt – Prüfungstrainer für Bankkaufleute

## 1. Zweck

Azubis zur Bankkauffrau oder zum Bankkaufmann sollen sich mit der App auf den **schriftlichen Teil 2 der Abschlussprüfung** vorbereiten (Ausbildungsordnung von 2020). Sie üben mit Multiple-Choice-Fragen, bekommen zu jeder Antwort sofort eine Erklärung und sehen, in welchen Prüfungsbereichen sie noch schwach sind.

## 2. Nutzer

- **Hauptnutzer:** Azubis Bankkaufleute im 2. und 3. Ausbildungsjahr, nach Teil 1 der Abschlussprüfung.
- **Situation:** Sie lernen kurz zwischendurch (Bahn, Pause) auf dem Handy oder länger am PC (Berufsschule, zu Hause).
- **Vorwissen:** Sie kennen die Fachbegriffe aus der Berufsschule. Mit Technik müssen sie sich nicht auskennen.

## 3. Funktion

### Prüfungsbereiche in der App

Die drei schriftlichen Prüfungsbereiche von Teil 2 (§ 10 BankkflAusbV 2020):

| Kürzel | Prüfungsbereich |
|---|---|
| `vermoegen` | Vermögen aufbauen und Risiken absichern |
| `finanzierung` | Finanzierungsvorhaben begleiten |
| `wiso` | Wirtschafts- und Sozialkunde |

### Muss

1. **Startseite** mit dem Knopf „Üben“ und dem Knopf „Fortschritt zurücksetzen“.
2. **Übungsmodus:**
   - Der Nutzer wählt einen Prüfungsbereich oder „Alle Bereiche“.
   - Eine Runde hat **10 Fragen**. Bei einem Bereich sind das alle 10 Fragen des Bereichs, bei „Alle Bereiche“ 10 zufällige aus allen 30.
   - Die Fragen kommen einzeln in zufälliger Reihenfolge. Auch die 4 Antworten werden bei jeder Anzeige neu gemischt.
   - Oben steht, bei welcher Frage man ist („Frage 3 von 10“).
   - Nach dem Klick sieht man sofort, ob die Antwort richtig oder falsch war (Farbe **und** Zeichen ✓ / ✗). Die richtige Antwort wird markiert, und eine kurze Erklärung erscheint. Danach kann man die Antwort nicht mehr ändern.
   - Mit dem Knopf „Weiter“ geht es zur nächsten Frage.
   - Am Ende einer Runde steht eine Zusammenfassung: „x von 10 richtig“, mit den Knöpfen „Nochmal“ und „Zur Startseite“.
   - Wird die Runde vorher verlassen, bleiben die schon gegebenen Antworten im Fortschritt.
3. **Fragenkatalog:** 30 Fragen, 10 pro Prüfungsbereich.
4. **Fortschritt speichern:** Jede beantwortete Frage wird im Browser gespeichert (localStorage). Nach dem Neuladen der Seite ist der Fortschritt noch da.
5. **Fortschritt zurücksetzen:** Der Knopf löscht alle gespeicherten Daten, auch die Prüfungsergebnisse. Vorher fragt die App nach („Wirklich alles löschen?“).

### Soll (die zwei sichtbaren Highlights)

Beide Highlights bekommen je einen eigenen großen Knopf auf der Startseite („Prüfung simulieren“ und „Mein Fortschritt“).

1. **Highlight 1: Prüfungsmodus mit Timer**
   - 15 Fragen: je **5 zufällige aus jedem der drei Bereiche**, danach gemischt.
   - Ein Countdown von 15:00 Minuten ist immer sichtbar. In der letzten Minute wird er rot.
   - Der Timer rechnet mit der Uhrzeit des Endes und nicht mit gezählten Sekunden. So stimmt er auch, wenn das Handy kurz gesperrt war oder der Tab im Hintergrund lag.
   - Während der Prüfung gibt es keine Erklärungen und keine Rückmeldung zu richtig oder falsch.
   - Man kann mit „Zurück“ und „Weiter“ zwischen den Fragen springen und Antworten ändern. Eine Leiste mit den Nummern 1–15 zeigt, welche Fragen schon beantwortet sind.
   - **Abgeben:** mit dem Knopf „Abgeben“ oder automatisch bei 0:00. Sind beim Knopf noch Fragen offen, fragt die App nach („Noch 3 Fragen offen. Trotzdem abgeben?“).
   - **Abbrechen:** Beim Klick auf die Startseite während der Prüfung fragt die App: „Prüfung wirklich abbrechen?“ Eine abgebrochene Prüfung wird nicht gewertet und nicht gespeichert.
   - **Wertung:** Offene Fragen zählen als falsch.
     Punkte = richtige Antworten ÷ 15 × 100, kaufmännisch gerundet auf ganze Punkte.
   - **Ergebnis:** Punkte (0–100), Note nach dem IHK-Punkteschlüssel und eine Liste aller 15 Fragen mit der eigenen Antwort, der richtigen Antwort und der Erklärung.
   - Die Antworten aus der Prüfung zählen auch für den Fortschritt im Dashboard. Offene Fragen zählen dort nicht.

   | Punkte | Note |
   |---|---|
   | 100–92 | 1 – sehr gut |
   | 91–81 | 2 – gut |
   | 80–67 | 3 – befriedigend |
   | 66–50 | 4 – ausreichend |
   | 49–30 | 5 – mangelhaft |
   | 29–0 | 6 – ungenügend |

   Beispiele: 15 richtig = 100 = Note 1 · 14 richtig = 93 = Note 1 · 12 richtig = 80 = Note 3 · 10 richtig = 67 = Note 3 · 8 richtig = 53 = Note 4 · 7 richtig = 47 = Note 5.

   Unter dem Ergebnis steht ein Hinweis: „Das ist eine Übungsnote. Die echte Prüfung hat mehr und andere Aufgaben.“

2. **Highlight 2: Fortschritts-Dashboard**
   - Ein Balken pro Prüfungsbereich zeigt den Anteil richtiger Antworten in Prozent.
   - **Berechnung:** Pro Frage zählt die **letzte** Antwort. Prozent = richtig beantwortete Fragen ÷ bearbeitete Fragen des Bereichs. So steigt der Balken, wenn sich der Nutzer verbessert.
   - Farben: unter 50 % rot, 50–79 % gelb, ab 80 % grün. Die Prozentzahl steht immer als Text daneben.
   - Zu jedem Bereich steht „x von 10 Fragen bearbeitet“. Die 10 kommt aus dem Fragenkatalog und ist nicht fest im Code eingetragen.
   - Ein Bereich ohne bearbeitete Frage zeigt einen leeren grauen Balken und den Text „Noch nicht geübt“.
   - **Schwächster Bereich:** der Bereich mit der niedrigsten Prozentzahl unter den Bereichen mit mindestens einer bearbeiteten Frage. Bei Gleichstand gilt die Reihenfolge der Tabelle oben. Er ist hervorgehoben und hat einen Knopf „Jetzt üben“, der direkt den Übungsmodus für diesen Bereich startet. Ist noch nichts bearbeitet, wird kein Bereich hervorgehoben.
   - Die letzten 5 Ergebnisse aus dem Prüfungsmodus erscheinen mit Datum (TT.MM.JJJJ), Punkten und Note, das neueste oben. Gibt es noch keine Prüfung, steht dort „Noch keine Prüfung gemacht“.

### Bewusst nicht (für später)

- Fehler-Wiederholung (eigener Stapel mit falsch beantworteten Fragen)
- Lern-Serie / Streak
- Teil 1 der Abschlussprüfung („Konten führen und Anschaffungen finanzieren“)
- Prüfungsbereich „Kunden beraten“ (mündlich, Gesprächssimulation)
- Offene Aufgaben und Rechenaufgaben mit Zahleneingabe
- Prüfung pausieren oder nach dem Neuladen fortsetzen
- Login, Benutzerkonten, Server oder Datenbank
- Fortschritt auf mehrere Geräte übertragen
- Fragen in der App bearbeiten oder hinzufügen (das passiert direkt in der Datei)
- Mehrere Sprachen

## 4. Daten

### Fragen

Die Fragen stehen in einer eigenen Datei `fragen.js` als JavaScript-Liste. Eine JS-Datei statt JSON wird gewählt, weil `fetch` beim Öffnen per Doppelklick (`file://`) nicht funktioniert.

Aufbau einer Frage:

```
{
  id: "ver-01",                      // eindeutig: ver-, fin- oder wis- plus Nummer
  bereich: "vermoegen",              // vermoegen | finanzierung | wiso
  frage: "Text der Frage",
  antworten: ["A", "B", "C", "D"],   // genau 4, in der Datei steht die richtige an Position `richtig`
  richtig: 2,                        // Position der richtigen Antwort in der Datei (0–3)
  erklaerung: "Kurze Begründung, 1–3 Sätze"
}
```

Regeln für die Fragen:

- Weil die Antworten gemischt werden, sind Antworten wie „Alle genannten“ oder „A und B“ nicht erlaubt.
- Jede Frage hat genau eine eindeutig richtige Antwort.
- Gesetze, Beträge und Fristen beziehen sich auf den Stand von 2026. Fragen mit Zahlen, die sich oft ändern (z. B. aktuelle Zinssätze), werden vermieden.

### Gespeicherter Fortschritt (localStorage)

Ein Eintrag unter dem Schlüssel `lernwelt-fortschritt` mit:

- `version`: Nummer des Datenformats (Start: 1)
- **Pro Frage-ID:** wie oft beantwortet, wie oft richtig, ob die letzte Antwort richtig war
- **Prüfungen:** Liste mit Datum, Punkten und Note (nur die letzten 5 werden behalten)

Gespeicherte Frage-IDs, die es in `fragen.js` nicht mehr gibt, werden ignoriert. Sind die gespeicherten Daten kaputt oder unlesbar, startet die App mit leerem Fortschritt und stürzt nicht ab.

Wenn localStorage nicht verfügbar ist (z. B. im privaten Modus), läuft die App trotzdem. Es erscheint nur ein Hinweis, dass der Fortschritt nicht gespeichert wird.

## 5. Oberfläche

- **Sprache:** Deutsch, einfache und klare Texte, Anrede mit „du“.
- **Aufbau:** eine einzige Seite (`index.html`). Die Ansichten Start, Üben, Prüfung, Ergebnis und Dashboard werden per JavaScript ein- und ausgeblendet.
- **Kopfzeile:** App-Name „Lernwelt“ und ein Knopf zurück zur Startseite (auf der Startseite selbst ausgeblendet). Im Prüfungsmodus steht der Timer ebenfalls in der Kopfzeile. Die Kopfzeile bleibt beim Scrollen oben stehen, damit der Timer immer sichtbar ist.
- **Startseite:** Drei große Knöpfe mit kurzer Beschreibung in einer zweiten Zeile. Darüber steht der Lernstand („Du hast schon x von 30 Fragen bearbeitet“), sobald es Fortschritt gibt.
- **Touch:** Hover-Effekte gibt es nur bei Geräten mit Maus. Beim Antippen reagieren Knöpfe sichtbar. Lange Fachwörter werden getrennt.
- **Responsiv:** funktioniert auf dem Handy (ab 360 px Breite) und am PC. Auf dem Handy liegen die Antworten untereinander, Knöpfe sind mindestens 44 px hoch.
- **Farben:** Rot als Hauptfarbe (Kopfzeile, Hauptknöpfe), dazu Weiß und neutrales Grau. Kein Logo und kein Name einer echten Bank. Grün für richtig, ein dunkleres Rot für falsch. Informationen werden nie nur über Farbe gezeigt, immer auch mit Zeichen oder Text.
- **Bedienung:** alles auch mit der Tastatur bedienbar (Tab und Enter). Antworten sind echte Knöpfe (`<button>`).

## 6. Technik und Grenzen

- Nur **HTML, CSS und JavaScript**, keine externen Bibliotheken, keine Schriften oder Dateien aus dem Internet.
- Dateien: `index.html`, `style.css`, `app.js`, `fragen.js`.
- Läuft per Doppelklick auf `index.html` in aktuellen Browsern (Chrome, Edge, Firefox, Safari), ohne Installation und ohne Internet.
- Keine Passwörter, Schlüssel oder persönlichen Daten in Dateien.
- **Grenze Inhalt:** Die 30 Fragen sind selbst geschriebene Übungsfragen im Stil der Prüfung und keine echten IHK-Prüfungsaufgaben. Sie werden nicht aus Prüfungsbüchern oder alten Prüfungen abgeschrieben. Vor dem Einsatz mit Azubis muss eine fachkundige Person (z. B. Ausbilder oder Lehrkraft) die Inhalte prüfen. Das gehört nicht zur Bau-Runde.
- **Grenze Note:** Die Note im Prüfungsmodus ist nur ein Richtwert. Die echte Prüfung besteht aus mehreren Bereichen mit eigenen Bestehensregeln.
- **Grenze Speicher:** Der Fortschritt gilt nur für diesen Browser auf diesem Gerät. Wer die Browserdaten löscht, verliert ihn. Eine laufende Prüfung geht beim Neuladen verloren.
- **Grenze Umfang:** Alles muss in einer Arbeitsrunde baubar sein. Wird es knapp, hat Muss Vorrang vor Soll.

## 7. Abnahmekriterien

Die App ist fertig, wenn alle Punkte erfüllt sind.

**Muss**

- [ ] `index.html` öffnet sich per Doppelklick ohne Fehler in der Browser-Konsole.
- [ ] `fragen.js` enthält genau 30 Fragen, 10 pro Bereich, jede mit eindeutiger ID, 4 Antworten, `richtig` zwischen 0 und 3 und einer Erklärung.
- [ ] Keine Antwort lautet „Alle genannten“ oder ähnlich.
- [ ] Im Übungsmodus kann man einen Bereich wählen und bekommt genau die 10 Fragen dieses Bereichs.
- [ ] Bei „Alle Bereiche“ kommen 10 Fragen, ohne doppelte Frage in einer Runde.
- [ ] Die Reihenfolge der Antworten ist bei wiederholten Runden unterschiedlich.
- [ ] Nach einer Antwort erscheinen sofort richtig/falsch (Farbe **und** Zeichen), die richtige Lösung und die Erklärung. Die Antwort lässt sich danach nicht mehr ändern.
- [ ] Am Ende einer Runde steht „x von 10 richtig“.
- [ ] Nach dem Neuladen der Seite ist der Fortschritt noch da.
- [ ] „Fortschritt zurücksetzen“ fragt nach und löscht danach alle Daten. Bei „Abbrechen“ bleibt alles erhalten.
- [ ] Wird in localStorage unter `lernwelt-fortschritt` Unsinn eingetragen (z. B. `abc`), startet die App trotzdem mit leerem Fortschritt.

**Soll – Prüfungsmodus**

- [ ] Die Prüfung enthält 15 verschiedene Fragen, genau 5 aus jedem Bereich.
- [ ] Der Timer zählt von 15:00 herunter und wird in der letzten Minute rot.
- [ ] Während der Prüfung gibt es keine Rückmeldung zu richtig oder falsch.
- [ ] Man kann zwischen den Fragen vor und zurück springen und Antworten ändern. Die Leiste 1–15 zeigt beantwortete Fragen an.
- [ ] Bei offenen Fragen fragt „Abgeben“ nach.
- [ ] Bei 0:00 wird die Prüfung automatisch abgegeben.
- [ ] Punkte und Note stimmen mit den Beispielen in Abschnitt 3 überein (z. B. 12 richtig = 80 Punkte = Note 3, 7 richtig = 47 Punkte = Note 5).
- [ ] Die Auswertung zeigt für alle 15 Fragen die eigene Antwort (oder „keine Antwort“), die richtige Antwort und die Erklärung.
- [ ] Eine abgebrochene Prüfung erscheint nicht im Dashboard.

**Soll – Dashboard**

- [ ] Für jeden der drei Bereiche gibt es einen Balken mit Prozentzahl als Text und der richtigen Farbe (rot / gelb / grün).
- [ ] Zu jedem Bereich steht „x von 10 Fragen bearbeitet“.
- [ ] Ohne Daten zeigen alle Bereiche „Noch nicht geübt“, und kein Bereich ist hervorgehoben.
- [ ] Mit Daten ist der schwächste Bereich hervorgehoben, und „Jetzt üben“ startet den Übungsmodus für genau diesen Bereich.
- [ ] Wird eine vorher falsche Frage später richtig beantwortet, steigt die Prozentzahl.
- [ ] Die letzten 5 Prüfungsergebnisse stehen mit Datum, Punkten und Note da, das neueste oben.

**Allgemein**

- [ ] Auf 360 px Breite (Handy) ist nichts abgeschnitten und es gibt keinen waagerechten Bildlauf.
- [ ] Alle Knöpfe sind mit Tab und Enter erreichbar.
- [ ] Es werden keine externen Bibliotheken oder Dateien aus dem Internet geladen.
