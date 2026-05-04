# Designsystem - Attitude Factory Operator OS

Status: Entwurf v0  
Zuletzt aktualisiert: 2026-05-01 (Milestone 4 abgeschlossen)

## Produktkontext

- **Was es ist:** Ein privates Operator OS für den Aufbau und Betrieb eines Portfolios unabhängiger KI-Influencer-Personas. Startpunkt ist ein 30-Tage-Instagram-Reichweitentest mit drei aktiven Personas.
- **Für wen es ist:** Gründer und Operator-Partner. Beide brauchen tägliche Produktionsklarheit, Persona-Konsistenz, manuelle Kennzahlen und harte Entscheidungen: stoppen, iterieren oder ausbauen.
- **Kategorie:** Creator Operations, Social-Media-Management, KI-Persona-Produktion, affiliate-fähige Content-Systeme.
- **Merksatz:** Kommandozentrale, nicht Content-Kalender.

## Sprache

Die Produktsprache ist Deutsch-first. Der Partner soll das System ohne Englischkenntnisse bedienen können.

Verbindlich:

- Navigation, Buttons, Statuslabels, Tabellen, Fehlermeldungen, Seed-Daten und Hilfetexte sind Deutsch.
- `docs/SPRACHE_UND_BEGRIFFE.md` ist die verbindliche Quelle für Modulnamen, Statuslabels und Entscheidungssignale.
- "Attitude Factory" und "Operator OS" dürfen als Marken-/Produktnamen stehen bleiben.
- Technische Framework-Begriffe dürfen im Code Englisch bleiben, aber nicht in der sichtbaren Oberfläche auftauchen.

## Recherche-Notizen

Viele Social-Media-Tools laufen auf dieselben Muster hinaus: Content-Kalender, Medienbibliothek, Analytics, Freigaben, Team-Kollaboration und visuelle Planung. Later ist stark in visueller Instagram-Planung. Buffer ist sauber und niedrigschwellig. Sprout und Hootsuite wirken stärker wie Enterprise-Workflows. Metricool kombiniert Planung, Analytics und Wettbewerbsbeobachtung.

Unsere Richtung soll nicht noch ein netter Scheduler sein. Die stärkere Referenz ist Linear: Dashboards brauchen einen klaren Zweck, tägliche Boards müssen dicht und schnell erfassbar sein, und ein veraltetes Dashboard ist schlimmer als kein Dashboard.

Referenzen:

- Linear Dashboard Principles: https://linear.app/now/dashboards-best-practices
- Linear Dashboard Docs: https://linear.app/docs/dashboards
- Metricool Scheduling Tools 2026: https://metricool.com/best-social-media-scheduling-tools/
- Buffer Scheduler Comparison 2026: https://buffer.com/resources/social-media-scheduling-tools/
- Later Scheduler Comparison 2026: https://later.com/blog/best-social-media-schedulers/

## Visuelle Richtung

- **Richtung:** Editorial Control Room
- **Dekoration:** Absichtlich, sparsam, nie verspielt
- **Stimmung:** Ernst, fokussiert, scharf und leicht filmisch. Es soll wie ein privates Kontrollsystem wirken, in dem Operator unter Druck Entscheidungen treffen.
- **Haltung:** Dicht, ruhig, entscheidungsorientiert. Die Oberfläche respektiert tägliche Wiederholung, kurze Aufmerksamkeitsspannen und hohen Kontext.
- **Vermeiden:** Purple-AI-Gradienten, runde Bubble-Karten, übergroße Marketing-Heroes, generische SaaS-Raster, verspielte Creator-Tool-Optik, Kalender-First-Denken.

## Freigegebene Shotgun-DNA

Die Design-Shotgun vom 2026-04-30 wurde als **Mix von allen Varianten** freigegeben.

Referenzen:

- Board: `C:/Users/yunus/.gstack/projects/attitude-factory-mission-control/designs/kommandozentrale-20260430/design-board.html`
- Freigegebener Mix: `C:/Users/yunus/.gstack/projects/attitude-factory-mission-control/designs/kommandozentrale-20260430/approved-mix.html`
- Entscheidung: `C:/Users/yunus/.gstack/projects/attitude-factory-mission-control/designs/kommandozentrale-20260430/approved.json`

Mischung:

- **A Kontrollraum als Basis:** App-Shell, dunkle linke Navigation, 30-Tage-Kommando oben, neutrale Arbeitsflächen, Signalrails.
- **D Produktionsmaschine als Arbeitsmotor:** Content-Produktion table-first mit Priorität, Zuständigkeit, Status, Fälligkeit und nächster Aktion.
- **B Redaktionsdesk als Stimme:** "Tageslage der Maschine" und kurze redaktionelle Entscheidungsblöcke, damit das Tool nicht nur Daten speichert, sondern Führung gibt.
- **C Signalradar als Akzent:** dunkle Daten-/Alarmmodule sparsam einsetzen, z.B. für Signalradar, Kennzahlen-Heatmap oder kritische Entscheidungsbereiche.

Regel:

- Die echte App darf nicht zu C-dunkel werden.
- Die echte App darf nicht zu B-editorial und textlastig werden.
- Die echte App darf nicht zu D-nüchtern werden.
- Die Haupt-DNA ist A + D; B gibt Sprache und Dramaturgie; C gibt Druck und Signalgefühl.
- Jeder Signalradar braucht eine kurze Legende. Farben und Zellen dürfen nie nur cool aussehen, sondern müssen erklären: Gewinner/Ausbauen, Info/Videoeinsatz, Risiko/Blockiert, noch kein Signal.

## Typografie

- **Display / Seitentitel:** IBM Plex Sans Condensed  
  Für Seitentitel, Kommando-Labels und große Screen-Überschriften.
- **Body / UI:** IBM Plex Sans  
  Für Navigation, Formulare, Buttons, Tabellen und dichte Oberflächen.
- **Daten / Kennzahlen:** IBM Plex Mono  
  Für Zahlen, Statuscodes, IDs, Uhrzeiten und kompakte Labels.

Font Loading:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Farbe

**Ansatz:** Ruhige neutrale Basis, seltene Signalfarbe mit echter Bedeutung.

Kernpalette:

- **Ink:** `#191A1A` - Primärtext, dunkle Leiste, höchste Betonung.
- **Graphite:** `#2B2D2E` - sekundäre dunkle Fläche, aktive Navigation.
- **Steel:** `#646A6F` - gedämpfter Text, Grenzen, Nebenlabels.
- **Mist:** `#ECEFED` - App-Hintergrund, Tabellenlinien, inaktive Flächen.
- **Panel:** `#FFFFFF` - Arbeitsflächen, Tabellen, Formulare.
- **Signal Red:** `#E7473C` - blockiert, Risiko, stoppen/pausieren.
- **Volt:** `#B7F34A` - aktiver Test, positives Signal, Gewinner-Kandidat.
- **Data Cyan:** `#29A7E1` - Recherche, Links, Informationssignale.
- **Amber:** `#F2A93B` - Warnung, bald fällig, Regelcheck-Aufmerksamkeit.
- **Zara Rose:** `#D85C82` - Akzent für Zara.
- **Alex Ember:** `#F36B2D` - Akzent für Alex.
- **David Blue:** `#2F6FED` - Akzent für David.

Semantik:

- Erfolg: `#20A464`
- Warnung: `#F2A93B`
- Gefahr: `#E7473C`
- Info: `#29A7E1`
- Aktiv: `#B7F34A`

Farbregeln:

- Arbeitsflächen bleiben überwiegend neutral.
- Persona-Farben sind Akzente, keine eigenen Themes.
- Signal Red und Volt sparsam einsetzen, damit sie Druck behalten.
- Keine Gradient-Hintergründe im App-Shell.

## Layout

- **Ansatz:** Rasterdiszipliniertes Operator-Dashboard.
- **Shell:** Linke Navigationsleiste, obere Kontextleiste, Hauptarbeitsfläche.
- **Kommandozentrale:** 12-Spalten-Raster auf Desktop, 30-Tage-Kommando ganz oben.
- **Primäre Panels:** volle Breite oder einzelne Werkzeugkarten. Keine Karten in Karten.
- **Tabellen:** Content-Produktion, Recherche-Eingang, Kennzahlen und Aufgaben.
- **Persona-Detail:** Tabs mit stabilem Profilkopf und kleinem Persona-Akzent.
- **Mobil:** sekundär, aber für Statusprüfung und Queue-Nutzung brauchbar.

Informationshierarchie:

1. Heutiger operativer Zustand
2. Entscheidungen, die warten
3. Produktions-Queue
4. Persona-Gesundheit und Konsistenz
5. Kennzahlen und Recherche-Details

## Abstände und Dichte

- **Basiseinheit:** 4px
- **Dichte:** kompakt
- **Skala:** 2xs(2), xs(4), sm(8), md(12), lg(16), xl(24), 2xl(32), 3xl(48)
- **Kartenradius:** maximal 8px
- **Kontrollradius:** 6px
- **Tabellen:** kompakte Zeilenhöhe mit klaren Hover- und Fokuszuständen

Leerraum trennt Entscheidungen. Er soll nicht nach Marketingseite aussehen.

## Komponenten

Operator OS nutzt eine kleine verbindliche Komponentenbibliothek.

Entscheidung aus `/plan-design-review` vom 2026-04-30:

- Screens werden aus stabilen Operator-Komponenten gebaut.
- Neue Varianten brauchen einen klaren Zweck.
- Sichtbare Texte, Labels und Zustände bleiben deutsch.

Pflichtkomponenten:

| Komponente | Zweck | Varianten |
|---|---|---|
| AppShell | Navigation, Topbar, Kontextstatus | Desktop-Sidebar, Mobile-Nav |
| Panel | Arbeitsflächen | neutral, dunkel, Warnung, kompakt |
| StatusBadge | Status und Entscheidungssignale | neutral, aktiv, info, warnung, gefahr, erfolg |
| ActionButton | echte Befehle | primär, sekundär, gefahr, icon-only |
| DataTable | dichte Arbeitslisten | sticky header, row actions, empty state |
| EmptyState | operative Leere | Standard, Mentor, Fehler, Teilzustand |
| FormField | Eingaben | Text, Zahl, Datum, Select, Textarea, Fehler |
| DecisionCard | erklärbare Entscheidung | Gewinner, schwach, Kennzahlen fehlen, Videoeinsatz |
| PersonaAccent | kleine Persona-Zuordnung | Zara, Alex, David, neutral |
| SignalRadar | Signalzellen mit Legende | Gewinner, Info, Risiko, kein Signal |

Regeln:

- Buttons verwenden klare Befehle, z.B. "Speichern", "Kennzahlen eintragen", "Regelcheck starten".
- StatusBadge ersetzt lange erklärende Labels in Tabellen.
- EmptyState ist kein Textblock allein, sondern immer Zustand plus Aktion.
- DataTable ist Standard für wiederholbare Arbeitslisten.
- Cards werden nicht verschachtelt.
- PersonaAccent darf keine ganze Seite einfärben.
- ActionButton und StatusBadge müssen 40px Touch-Ziel auf Mobile einhalten, wenn sie direkt bedienbar sind.

### App-Shell

- Linke Leiste mit Icon und Label.
- Aktiver Navigationspunkt nutzt dunkle Fläche und Volt-Indikator.
- Topbar zeigt Teststatus, Tageszählung, aktive Nutzer und letzte Kennzahl-Aktualisierung.

### Login / Anmelden

Entscheidung aus `/plan-design-review` vom 2026-04-30:

- **Private Kontrollraum-Schleuse.**
- `/anmelden` ist kein öffentlicher Produkt- oder Marketing-Einstieg.
- Die Seite soll nach Zugang zu einem privaten Operator-System wirken.

Pflichtinhalte:

- Attitude Factory / Operator OS als Produktkennung.
- E-Mail-Feld.
- Passwort-Feld.
- Primärer Button: "Anmelden".
- Fehlertext direkt am Formular.
- kurzer Systemstatus, z.B. "Privater Zugang", "Keine öffentliche Registrierung".

Visuelle Richtung:

- Ruhige helle oder zweigeteilte Fläche mit dunklem Kontrollraum-Panel.
- Keine Hero-Sektion.
- Keine Persona-Galerie als Marketingmoment.
- Kein öffentlicher CTA wie "Jetzt starten".
- Keine Signup-Links.
- Optional: kleines Systempanel mit Teststatus, z.B. "30-Tage-Test vorbereitet", "3 aktive Lanes".

Zustände:

| Zustand | Nutzer sieht |
|---|---|
| leer | Formular mit klarem Hinweis "Privater Zugang" |
| lädt | Button zeigt "Anmeldung läuft..." und ist deaktiviert |
| falsche Daten | "E-Mail oder Passwort falsch." |
| Session abgelaufen | "Bitte neu anmelden." |
| kein Zugriff | "Dein Zugang ist nicht aktiv." |

Regel:

- Login muss hochwertig wirken, aber nicht verkaufen.
- Der erste Eindruck ist: geschlossenes Kontrollsystem, nicht SaaS-Landingpage.
- Erste Umsetzung: `/anmelden` nutzt eine dunkle Kontrollraum-Fläche, ein klares deutsches Formular, Systemstatus und keine Signup-Links.

### Rollenfokus

Entscheidung aus `/plan-design-review` vom 2026-04-30:

- **Eine gemeinsame Kommandozentrale, aber rollenfokussiert.**
- Gründer und Partner sehen dieselbe operative Wahrheit.
- Die Reihenfolge, Hervorhebung und primären Aktionen dürfen sich je Rolle unterscheiden.

Gründer-Fokus:

- wartende Entscheidungen
- Gewinner-/Schwachsignale
- 30-Tage-Kommando
- Regelrisiken
- Videoeinsatz-Zuteilung
- harte Stoppen/Ausbauen-Entscheidungen

Operator-/Partner-Fokus:

- eigene Aufgaben
- blockierte Inhalte
- Material fehlt
- Kennzahlen eintragen
- Medien prüfen
- Inhalte für Gründer-Review vorbereiten

Regel:

- Kein separater Home-Screen in v1.
- Rolle verändert Priorität und Aktionen, nicht die Grundrealität.
- Sichtbare Texte bleiben deutsch und arbeitsorientiert.

### Emotionaler Ablauf

Die Kommandozentrale muss drei Zeithorizonte bedienen:

| Zeithorizont | Nutzerfrage | UI-Antwort |
|---|---|---|
| 5 Sekunden | Läuft die Maschine oder brennt etwas? | Topbar, 30-Tage-Kommando, Blocker und Signale |
| 5 Minuten | Was mache ich jetzt konkret? | Heute-Queue, nächste Aktion, Zuständigkeit |
| 5 Wochen | Lernen wir wirklich oder sammeln wir nur Daten? | DecisionLog, Experimente, 30-Tage-Entscheidungen |

Der Gründer soll Druck und Kontrolle fühlen.
Der Partner soll Klarheit und Machbarkeit fühlen.
Beide sollen merken: Die Maschine führt zur nächsten Aktion.

### 30-Tage-Kommando

Das ist das Erste, was ein Operator sieht.

Pflichtinformationen:

- Tag im 30-Tage-Test
- veröffentlichter Output
- genutzte Videos
- fehlende Kennzahlen
- aktueller Gewinner
- schwächste Spur
- nächster Entscheidungstermin

### Entscheidungslogik

- Kompakte Karten mit Label, Grund, verknüpfter Persona/Inhalt und Aktion.
- Jede Karte muss beantworten: "Warum sehe ich das?"
- Farbschienen statt vollflächiger Warnfarben.

Beispiele:

- "Ausbauen: Davids Karussell-Format"
- "Schwaches Signal: Alex Zitatbilder"
- "Videoeinsatz-Kandidat: Zaras Routine-Map"
- "Kennzahlen fehlen: 6 gepostete Inhalte"

### Persona-Karten

- Avatar oder Referenz-Crop
- kleiner Persona-Akzent
- aktueller Status
- Konsistenzwert
- Reichweitensignal
- nächste Aktion

Persona-Karten sind operative Assets, keine Social-Profile.

### Tabellen

- Sticky Header, wo sinnvoll.
- Kennzahlen in IBM Plex Mono.
- Klare leere Zustände.
- Zeilenaktionen bei Hover/Fokus.
- Filterchips kompakt und entfernbar.

### Statuslabels

Kurze Labels:

- Entwurf
- Idee
- Gebrieft
- Material fehlt
- Material bereit
- Prüfung
- Bereit zum Posten
- Gepostet
- Kennzahlen fehlen
- Ausgewertet
- Gewinner-Kandidat
- Schwaches Signal
- Blockiert

### Formulare

- Labels linksbündig.
- Fehler direkt am Feld.
- Speichern-Buttons bleiben nah am Formular.
- Lange Felder für Hooks, Captions und Prompts zeigen bei Bedarf Zeichenzähler.

## Interaktionszustände

Entscheidung aus `/plan-design-review` vom 2026-04-30:

- **Operative Leere + Mentor-Erklärung.**
- Leere, fehlerhafte oder teilweise Zustände dürfen nie tot wirken.
- Jeder Zustand muss dem Nutzer sagen:
  1. Was fehlt?
  2. Warum ist es relevant?
  3. Was ist die nächste sinnvolle Aktion?

### Empty States

Standard:

```text
Kurzer Zustand
  -> knapper Grund
  -> primäre Aktion
  -> optionaler Mentor-Hinweis
```

Beispiele:

| Modul | Zustand | Textlogik | Primäre Aktion |
|---|---|---|---|
| Kennzahlen | keine Metriken | "Noch keine Kennzahlen. Ohne Werte kann die Entscheidungslogik nichts bewerten." | Kennzahlen eintragen |
| Content-Produktion | keine Inhalte | "Noch keine Inhalte geplant. Starte mit einem Content-Brief für eine aktive Persona." | Inhalt anlegen |
| Medien | keine Assets | "Noch keine Medien freigegeben. Setcards und Referenzen sichern die Persona-Konsistenz." | Medium hochladen |
| Recherche | keine Recherche | "Noch keine Quellen erfasst. Gute Ideen sollen nicht in Tabs und Chats verschwinden." | Recherche speichern |
| Angebots-Check | kein Angebot | "Noch keine Angebotskategorie verbunden. Monetarisierung bleibt vorbereitet, aber nicht erzwungen." | Kategorie prüfen |
| Regelcheck | offen | "Noch kein Regelcheck. Inhalte mit Claims oder Affiliate-Bezug brauchen Freigabe." | Regelcheck starten |

### Error States

Fehler müssen deutsch, kurz und handlungsfähig sein.

Regeln:

- Keine technischen Details in der Oberfläche.
- Immer sagen, ob der Nutzer erneut versuchen, Daten ändern oder später prüfen soll.
- Upload-, Login- und Speicherfehler dürfen nie still verschwinden.

Beispiele:

- "Speichern fehlgeschlagen. Prüfe die Pflichtfelder und versuche es erneut."
- "Upload fehlgeschlagen. Datei ist zu groß oder hat ein nicht erlaubtes Format."
- "Kennzahlen konnten nicht gespeichert werden. Deine Eingaben sind noch sichtbar."

### Success States

Erfolg ist kurz und arbeitsorientiert.

Beispiele:

- "Inhalt gespeichert."
- "Kennzahlen eingetragen. Entscheidungssignal aktualisiert."
- "Medium freigegeben."
- "Regelcheck bestanden. Inhalt kann geprüft werden."

### Partial States

Teilweise Zustände sind im Operator OS normal und müssen sichtbar sein.

Beispiele:

- Inhalt ist gepostet, aber Kennzahlen fehlen.
- Persona ist aktiv, aber Handle fehlt.
- Medium ist hochgeladen, aber noch nicht freigegeben.
- Regelcheck ist teilweise erfüllt, aber Affiliate-Hinweis fehlt.

Darstellung:

- Statuslabel mit konkretem fehlendem Teil.
- Nächste Aktion direkt daneben.
- Keine generischen Warnungen ohne Handlung.

### Mentor-Hinweise

Mentor-Hinweise sind erlaubt, aber nur dort, wo sie Aufbauarbeit beschleunigen.

Regeln:

- Maximal 1-2 Sätze.
- Nicht in jeder täglichen Zeile wiederholen.
- Ideal für erste Nutzung, leere Module und riskante Entscheidungen.
- Kein belehrender Ton.

Beispiel:

```text
Noch keine Kennzahlen.
Ohne Reichweite, Saves und Follows kann die Maschine keine Gewinner erkennen.
[Kennzahlen eintragen]
```

## Screen-Richtung

### Kommandozentrale

Der Standardscreen. Er muss wirken wie die erste Seite eines missionskritischen Arbeitsboards.

Muss enthalten:

- 30-Tage-Kommando
- Heute-Queue
- Entscheidungslogik
- Videoeinsatz-Status
- fehlende Kennzahlen
- aktive Persona-Gesundheit

### Erste Bildschirmhöhe

Entscheidung aus `/plan-design-review` vom 2026-04-30:

- **Arbeitsboard zuerst.**
- Das 30-Tage-Kommando bleibt oben, aber kompakt genug, damit echte Arbeit sofort sichtbar wird.
- In den ersten 5 Sekunden müssen Operator mindestens diese drei Dinge erkennen:
  1. Was ist heute kritisch?
  2. Welche Inhalte oder Kennzahlen blockieren Entscheidungen?
  3. Welche nächste Aktion gehört wem?

Desktop-Priorität:

```text
Topbar / Teststatus
  -> kompaktes 30-Tage-Kommando
  -> Tageslage oder Heute-Queue
  -> Entscheidungslogik
  -> Signalradar / Regelcheck
```

Regel:

- Keine heroartige 30-Tage-Fläche, die die operative Arbeit aus dem ersten Viewport drückt.
- Tageslage, Heute-Queue und Entscheidungslogik müssen wichtiger wirken als reine Statuszahlen.
- Das Produkt darf sich stark anfühlen, aber es muss zuerst Arbeitsdruck erzeugen.

### Personas

Die Übersicht zeigt, welcher Creator Aufmerksamkeit braucht. Die Detailseite unterstützt Identität, visuelle Konsistenz, Content-Säulen, Feed-Gegner, Medien, Posts, Experimente, Angebots-Check und Regelcheck.

### Detailseiten-DNA

Entscheidung aus `/plan-design-review` vom 2026-04-30:

- **Gleiche Shell, eigene Arbeitslogik pro Modul.**
- Persona- und Medienflächen dürfen gezielt visuelle Identität zeigen.
- Die App bleibt ein Operator-Werkzeug, keine bunte Creator-Themen-App.

Grundregel:

```text
Gemeinsame App-Shell
  -> gleiche Navigation, Tokens, Typografie, Statuslabels
  -> pro Modul eine eigene fachliche Primärfläche
  -> Persona-Akzente nur dort, wo Identität oder Konsistenz geprüft wird
```

Modul-DNA:

| Modul | Primärfläche | Darf visuell individueller sein? |
|---|---|---|
| Kommandozentrale | Tageslage, Queue, Signale | nein, nur kleine Persona-Akzente |
| 30-Tage-Kommando | Teststatus und Entscheidungen | nein, Druckfläche bleibt neutral |
| Personas | Profilkopf, Identität, Konsistenz-Lab | ja, kontrollierte Persona-Akzente |
| Content-Produktion | Tabelle und Review-Flow | nein, Arbeitsdichte zuerst |
| Medien | Asset-Review, Setcards, Referenzen | ja, Bildqualität und Konsistenz im Fokus |
| Kennzahlen | Eingabe und Entscheidungssignale | nein, Zahlenklarheit zuerst |
| Recherche | Quellenliste und Umwandlung in Ideen | sparsam, keine Moodboard-Fläche |
| Experimente | Hypothese, Variable, Ergebnis | nein, Testlogik zuerst |
| Angebots-Check | Readiness-Level und Claim-safe Angle | nein, Monetarisierung ohne Sales-Optik |
| Regelcheck | Checklisten und Warnungen | nein, Klarheit und Risiko zuerst |

Anti-Slop-Regeln:

- Nicht jedes Modul bekommt dieselbe Header-Karte plus dieselbe Kartenliste.
- Nicht jedes Modul wird eine generische Tabelle, wenn der Workflow ein Review-Lab braucht.
- Persona-Farben bleiben Akzente, keine Seitenthemes.
- Bilder werden nur dort dominant, wo Bildqualität oder Persona-Konsistenz beurteilt wird.

### Content-Produktion

Die Produktionsfläche ist table-first. Filter: Persona, Zuständigkeit, Status, Format und geplantes Datum.

### Recherche-Eingang

Schnell speichern, später verarbeiten. Aus einem Recherche-Item muss leicht eine Content-Idee werden.

### Kennzahlen

Kennzahlen müssen Entscheidungen auslösen. Keine Chart-Wände. Lieber kompakte Panels mit "Gewinner", "schwach", "mehr Daten nötig" oder "Kennzahlen fehlen".

### Regelcheck

Der Regelcheck gehört direkt in den Review-Moment: KI-/Synthetic-Hinweis, Affiliate-Hinweis, keine Fake-Produktnutzung, keine medizinischen Versprechen, keine Finanzversprechen.

## Bewegung

- **Ansatz:** minimal und funktional
- **Dauer:** 120-180ms
- **Easing:** ease-out für Einstieg, ease-in für Ausstieg, ease-in-out für Bewegung

Erlaubt für:

- Drawer öffnen/schließen
- Statuswechsel
- Toast-Feedback
- Zeilen aufklappen
- Entscheidungskarte erscheint/verschwindet

Vermeiden:

- dekorative Page-Load-Animation
- bouncy Transitions
- Scroll-Theater

## Barrierefreiheit

- Textkontrast mindestens WCAG AA.
- Alle interaktiven Elemente per Tastatur erreichbar.
- Fokuszustände sichtbar, bevorzugt Data Cyan oder Volt.
- Zustand nie nur über Farbe vermitteln.
- Tabellen brauchen klare Labels und Sortierzustände.
- Touch-Ziele mobil mindestens 40px.

## Responsive Strategie

Entscheidung aus `/plan-design-review` vom 2026-04-30:

- **Mobile ist eine vollwertige App.**
- Alle Kernfunktionen müssen auf Smartphone nutzbar sein, nicht nur lesbar.
- Desktop bleibt die effizienteste Arbeitsfläche, aber Mobile darf keine kaputte Zweitklasse-Version sein.

Viewport-Rollen:

| Viewport | Rolle | Layout-Regel |
|---|---|---|
| Desktop ab 1200px | volle Maschine | Sidebar, Topbar, 12-Spalten-Raster, Tabellen und Seitenspalten |
| Tablet 768-1199px | Arbeitsboard | Navigation kompakter, wichtige Panels untereinander, Tabellen mit horizontaler Kontrolle |
| Mobile bis 767px | vollwertige App | horizontale Modulnavigation, Karten-/Listenansichten statt breiter Tabellen, Formulare in fokussierten Abschnitten |

Mobile Pflicht:

- Kommandozentrale vollständig nutzbar.
- Content-Produktion darf nicht nur als breite Tabelle erscheinen.
- Eigene Aufgaben, Blocker und nächste Aktionen müssen ohne Zoomen erfassbar sein.
- Kennzahlen-Eingabe muss auf Smartphone bequem funktionieren.
- Medien-Upload und Medienprüfung müssen mobil möglich sein.
- Regelcheck muss mobil per Checkliste bedienbar sein.
- Persona-Detail darf lange Inhalte in Tabs oder Abschnitte aufteilen.

Mobile Tabellen-Regel:

- Tabellen dürfen horizontal scrollen, aber das ist nicht die primäre Mobile-Erfahrung.
- Für wiederkehrende Arbeitslisten braucht es eine mobile Row/Card-Variante mit denselben Daten:
  - Titel
  - Persona
  - Status
  - Zuständig
  - Fälligkeit
  - nächste Aktion
- Erste Umsetzung: `Heute-Queue` nutzt auf Desktop eine Tabelle und auf Mobile arbeitsfähige Karten mit denselben Pflichtdaten.

A11y-Regeln:

- Interaktive Elemente mindestens 44px Touch-Ziel, wenn sie auf Mobile direkt bedient werden.
- Fokuszustände sichtbar und nicht nur farblich codiert.
- Icon-only Buttons brauchen `aria-label`.
- Status und Signale brauchen Textlabel zusätzlich zur Farbe.
- Tabellen oder Listen müssen per Tastatur erreichbar bleiben.
- Fehler erscheinen direkt am Feld und zusätzlich als zusammenfassender Hinweis, wenn ein Formular mehrere Fehler hat.

Testregel:

- Jeder neue Kernscreen wird mindestens in Desktop und Mobile per Playwright geprüft.
- Mobile gilt erst als bestanden, wenn kein wichtiger Text abgeschnitten ist und die primäre Aktion erreichbar ist.

## Designrisiken

- **Risiko:** Das Produkt wird zu dunkel und filmisch.  
  **Leitplanke:** Arbeitsflächen hell/neutral halten, Dunkelheit für Leiste und Druckmomente nutzen.
- **Risiko:** Persona-Farben machen die UI chaotisch.  
  **Leitplanke:** Persona-Farben nur als kleine Akzente.
- **Risiko:** Dashboard wird Vanity Analytics.  
  **Leitplanke:** Jedes Kennzahlenpanel braucht eine Aktion oder Entscheidung.
- **Risiko:** Es sieht aus wie bestehende Social-Scheduler.  
  **Leitplanke:** 30-Tage-Kommando und Entscheidungslogik führen, nicht Kalender.
- **Risiko:** Sprache wird halb Deutsch, halb Englisch.  
  **Leitplanke:** `docs/SPRACHE_UND_BEGRIFFE.md` vor UI-Arbeit prüfen.

## Entscheidungslog

| Datum | Entscheidung | Begründung |
|---|---|---|
| 2026-04-30 | Richtung: Editorial Control Room | Passt zu Operator OS und vermeidet generische Social-Scheduler-Optik. |
| 2026-04-30 | IBM Plex Sans Condensed / Sans / Mono | Ernst, präzise, operativ, nicht Default-SaaS. |
| 2026-04-30 | Ruhige neutrale Palette mit Signal Red, Volt und Data Cyan | Hält die App ruhig und macht Entscheidungen visuell stark. |
| 2026-04-30 | Persona-Farben nur als Akzente | Bewahrt eigenständige Creator-Identitäten ohne chaotische Oberfläche. |
| 2026-04-30 | Deutsch-first als Produktsprache | Der Partner spricht kein Englisch; Übersetzung darf später kein Bremsklotz werden. |
| 2026-04-30 | Arbeitsboard zuerst | Die Kommandozentrale ist tägliche Arbeitsfläche, keine Kampagnen-Hero-Seite. |
| 2026-04-30 | Operative Leere plus Mentor-Erklärung | Empty/Error/Partial States müssen Zustand, Grund und nächste Aktion zeigen. |
| 2026-04-30 | Rollenfokus in gemeinsamer Kommandozentrale | Gründer und Partner sehen dieselbe Wahrheit, aber unterschiedliche Prioritäten. |
| 2026-04-30 | Gleiche Shell, eigene Modul-Arbeitslogik | Verhindert generische Admin-Seiten und hält jedes Modul als Werkzeug scharf. |
| 2026-04-30 | Mobile ist vollwertige App | Kernfunktionen müssen mobil nutzbar sein; Tabellen brauchen mobile Listenvarianten. |
| 2026-04-30 | Login als private Kontrollraum-Schleuse | `/anmelden` wirkt wie Zugang zu einem privaten System, nicht wie SaaS-Marketing. |

## Plan-Design-Review v1

Trigger: `/plan-design-review`  
Datum: 2026-04-30  
Status: **CLEAR mit umgesetzten Sofort-Fixes**

### Bewertung

| Pass | Start | Nach Entscheidungen/Fixes |
|---|---:|---:|
| Informationsarchitektur | 7/10 | 9/10 |
| Interaktionszustände | 5.5/10 | 9/10 |
| User Journey | 6.5/10 | 9/10 |
| AI-Slop-Risiko | 8/10 | 9/10 |
| Designsystem-Ausrichtung | 8.5/10 | 9.5/10 |
| Responsive & Accessibility | 6.5/10 | 8.5/10 |
| Offene Designentscheidungen | 7/10 | 9/10 |

Gesamtscore:

- Start: **7.5/10**
- Nach Review: **9/10**

### Entscheidungen

1. Kommandozentrale: **Arbeitsboard zuerst**.
2. Empty/Error/Partial States: **operative Leere plus Mentor-Erklärung**.
3. Rollenmodell: **gemeinsame Kommandozentrale mit rollenfokussierter Priorität**.
4. Detailseiten: **gleiche Shell, eigene Arbeitslogik pro Modul, Persona-Akzente nur gezielt**.
5. Komponenten: **kleine verbindliche Operator-Komponentenbibliothek**.
6. Mobile: **vollwertige App, nicht nur Kontrollblick**.
7. Login: **private Kontrollraum-Schleuse**.

### Sofort Umgesetzt

- `EmptyState`-Komponente gebaut.
- Platzhalter-Module nutzen `EmptyState` statt tote Textflächen.
- `Heute-Queue` nutzt Desktop-Tabelle und mobile Arbeitskarten.
- `/anmelden` als private Kontrollraum-Schleuse gebaut.
- Playwright-Smoke-Test prüft Kommandozentrale und Login auf Desktop und Mobile.

### Was Bereits Existiert

- `DESIGN.md` mit Editorial-Control-Room-Richtung.
- Freigegebener Design-Shotgun-Mix:
  - `C:/Users/yunus/.gstack/projects/attitude-factory-mission-control/designs/kommandozentrale-20260430/approved-mix.html`
- App-Shell mit dunkler Navigation.
- Kommandozentrale mit 30-Tage-Kommando, Heute-Queue, Entscheidungslogik, Persona-Gesundheit und Signalradar.
- `StatusBadge`, `EmptyState`, mobile Heute-Queue-Karten und Login-Formular.

### Nicht In Scope Für Diesen Review

- Vollständige visuelle Ausarbeitung aller Detailseiten.
- Finaler Auth-Flow mit Better Auth.
- Vollständige Medien-Upload-UX.
- Persona-Detailseite mit Konsistenz-Lab.
- Finales Kennzahlen-Formular und DecisionLog-UI.
- Feinschliff für alle Tablet-Breakpoints.

### Offene Designschulden

Keine bewusst deferierten TODOs aus diesem Review. Die drei potenziellen TODOs wurden direkt gebaut:

- EmptyState-Komponente.
- Mobile Listenvariante.
- Login-Design.

Restliche Arbeit entsteht jetzt als normale Feature-Implementierung in Milestone 1-4.
