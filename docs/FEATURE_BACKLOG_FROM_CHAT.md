# Feature Backlog From `chat.md`

Status: Arbeitsbacklog ab 2026-05-01  
Zweck: Übernehmbare Ansätze aus `chat.md` in konkrete Operator-OS-Features übersetzen.  
Leitplanke: Inspiration ja, Scope-Explosion nein.

## Executive Summary

`chat.md` liefert keine neue Produktstrategie, sondern wertvolle Feature-Rohmasse.

Der beste Transfer ist:

- Trigger-Logik in Content-Produktion
- Visual-Code-Logik in Personas und Medien
- Originalitäts-Check in Regelcheck
- Kill-/Scale-Logik in Entscheidungslogik und 30-Tage-Kommando
- Offer-Fit in Angebots-Check
- Hook-, Visual-, Caption- und Monetization-Engines als spätere Workflows

Wir behalten Startwelle 1 mit 6 aktiven Personas. Wir springen nicht zurück auf 4 Accounts.

## P0 - Sofort Relevant Für Milestone 3

### 1. Postmaterial-Workflow

Modul: Medien, Content-Produktion  
Status: umgesetzt am 2026-05-01

Problem:

- Launch-Pack hat 6 Prompt-Spuren, aber noch keine finalen Postbilder, Carousel-Slides oder Kurzvideos.
- Dadurch bleibt alles korrekt auf `Material fehlt`.

Feature:

- Prompt-Spur öffnen
- echtes Bild/Slide/Video hochladen
- Asset mit ContentItem verbinden
- Asset-Typ setzen: Postbild, Carousel-Slide oder Kurzvideo
- Status auf Kandidat, Bearbeiten oder freigegebenes Postmaterial setzen
- ContentItem kann danach Richtung Prüfung wechseln

Umgesetzt:

- Postmaterial-Schleuse in `/content-produktion`
- Upload für Postbild, Carousel-Slide und Kurzvideo
- Validierung von MIME-Type, Dateigröße, Materialtyp und Materialstatus
- sicherer Upload-Pfad ohne Originaldateiname als Speicherpfad
- Asset-Verknüpfung mit ContentItem und Persona
- Statusübergang auf `Material bereit` bei Kandidat oder freigegebenem Postmaterial
- Sichtbarkeit der Uploads in `/medien`
- geschützte Auslieferung über `/api/uploads/[...path]`
- Unit- und Playwright-Abdeckung für Validierung, Pfadsicherheit und Upload-Flow

Warum aus `chat.md`:

- Visual Engine und Content-System brauchen eine Brücke von Prompt zu fertigem Asset.

### 2. Trigger-Tags Pro ContentItem

Modul: Content-Produktion, Experimente, Entscheidungslogik  
Priorität: hoch

Feature:

- ContentItem bekommt 2-4 Trigger-Tags:
  - Neugier
  - Identität
  - Kompetenz
  - Status
  - Kontrast
  - Konflikt
  - Speichernutzwert
  - Teilenutzwert
  - FOMO
  - Micro-Commitment
  - Wiedererkennung

Nutzen:

- Wir sehen später, welche psychologischen Hebel wirklich Saves, Shares und Follows bringen.
- Hooks werden nicht nur "klingt gut", sondern testbar.

MVP:

- Erst als Text-/Enum-Feld und UI-Badges.
- Später als Filter und Kennzahlenvergleich.

### 3. Zielsignal Pro ContentItem

Modul: Content-Produktion, Kennzahlen  
Priorität: hoch

Feature:

- Jeder Inhalt bekommt genau ein primäres Zielsignal:
  - Reichweite
  - Saves
  - Shares
  - Follows
  - Vertrauen
  - Soft-Affiliate-Test

Aktueller Stand:

- `ContentIntent` existiert bereits.

Nächster Schritt:

- UI und Entscheidungslogik stärker an diesem Intent ausrichten.
- "Kein Zielsignal" darf kein fertiger Produktionsslot sein.

### 4. Originalitäts-Check

Modul: Regelcheck, Medien  
Priorität: hoch

Feature:

- Checkliste:
  - eigenes Bild oder eigenes Design
  - eigene Perspektive/Hook
  - kein Repost
  - kein fremdes Material ohne starke Transformation
  - Prompt oder Produktionsnotiz vorhanden
  - keine Wasserzeichen-/Credit-Scheinlösung

Warum:

- Instagram verschärft Recommendation-Regeln für unoriginelle Fotos und Carousels.
- Das trifft genau unseren Bild-/Carousel-Fokus.

### 5. Visual Code V1

Modul: Personas, Medien  
Priorität: hoch

Feature:

- Pro Persona strukturierte Felder:
  - Farbwelt
  - Locations
  - Outfit-/Stilanker
  - Lichtlogik
  - Kameradistanz
  - No-Go-Bilder
  - Gesichtskonsistenz-Notiz

Aktueller Stand:

- Persona-Modell hat bereits `visualIdentity`.

MVP:

- Erst im Persona-Detail als strukturierter Abschnitt oder JSON-nahe Textfelder.
- Medienprüfung zeigt Visual-Code-Abgleich.

### 6. Tag-14-Entscheidung

Modul: 30-Tage-Kommando, Entscheidungslogik  
Priorität: hoch

Feature:

- Nach genug Content-Versuchen erzeugt das System Entscheidungsvorschläge:
  - Ausbauen
  - Weiter testen
  - Pausieren
  - Stoppen

MVP-Regeln:

- Kein harter Stop vor mindestens 7 verwertbaren Content-Versuchen.
- Bewertung relativ zum Portfolio-Median.
- Begründung muss sichtbar sein.

### 7. Kennzahlen-Eingabe V1

Modul: Kennzahlen, Entscheidungslogik  
Priorität: hoch

Feature:

- Manuelle Eingabe:
  - Impressionen
  - Reichweite
  - Likes
  - Kommentare
  - Saves
  - Shares
  - Profilbesuche
  - Follows
  - Link-Klicks

Aktueller Stand:

- `MetricSnapshot` existiert im Datenmodell.

Nächster Schritt:

- Formular bauen, validieren, mit ContentItem verbinden.
- Raten berechnen: Saves/1.000 Reichweite, Shares/1.000 Reichweite, Follows/1.000 Reichweite.

## P1 - Danach Bauen

### 8. Hook Engine V1

Modul: Content-Produktion, Recherche  
Priorität: mittel-hoch

Feature:

- Pro Persona Hook-Bibliothek:
  - Hook-Text
  - Hook-Typ
  - Trigger-Tags
  - Zielsignal
  - Status: Idee, getestet, Gewinner, schwach

MVP:

- Manuell anlegen und aus ContentItems wiederverwenden.
- Keine automatische KI-Generierung im Tool in v1.

### 9. Caption Varianten

Modul: Content-Produktion  
Priorität: mittel

Feature:

- Kurze Caption
- Storytelling-Caption
- CTA
- Disclosure-Snippet

Nutzen:

- Gleicher Hook kann mit verschiedenen Captions getestet werden.
- Affiliate-/Compliance-Text bleibt kontrolliert.

### 10. Research Zu Content

Modul: Recherche-Eingang, Content-Produktion  
Priorität: mittel

Feature:

- ResearchItem in Content-Idee umwandeln.
- Quelle, Warum relevant, vorgeschlagener Hook und Persona-Fit bleiben verknüpft.

Warum:

- Ideen sollen nicht in Browser-Tabs, Chats oder Notizen verschwinden.

### 11. Offer-Fit Pro Persona

Modul: Angebots-Check  
Priorität: mittel

Feature:

- Pro Persona:
  - passende Angebotskategorien
  - verbotene Claim-Zonen
  - Soft-CTA
  - Disclosure-Text
  - Readiness-Level

MVP:

- Kein Affiliate-CRM.
- Nur Bereitschaft und Risiko sauber abbilden.

### 12. Experiment Board V1

Modul: Experimente  
Priorität: mittel

Feature:

- Hypothese
- Variable
- Persona
- ContentItems
- primäre Metrik
- Ergebnis
- Entscheidung

Beispiel:

- "David: Workflow-Carousel schlägt Tool-Listen bei Saves pro 1.000 Reichweite."

## P2 - Später, Wenn Kernmaschine Läuft

### 13. Persona Engine

Feature:

- Neue Persona aus Zielgruppe, Nische, Triggern, Monetarisierung und Visual Code strukturieren.

Nicht v1:

- Vollautomatische Persona-Generierung.
- Multi-Tenant-Agenturprodukt.

### 14. Visual Engine

Feature:

- Prompt-Bausteine und Visual-Code-Vorlagen je Persona.
- Generationshistorie mit Qualität und Konsistenz.

Nicht v1:

- Direkte Leonardo-/Google-AI-API-Generierung im Tool.

### 15. Monetization Engine

Feature:

- Aus Gewinner-Nische, Kommentaren und Link-Klicks Angebotsideen ableiten.
- Lead Magnet, Mini-Produkt, Affiliate-Funnel vorbereiten.

Nicht v1:

- Zahlungsabwicklung, Billing, Checkout, Kundenbereich.

### 16. Growth Lab Produktisierung

Feature:

- Aus den internen Learnings später ein eigenes Produkt oder Agentur-Angebot machen.

Nicht jetzt:

- Öffentliche SaaS-Landingpage.
- Externe Kunden-Workspaces.
- Billing.

## Bewusst Nicht Übernehmen

### 1. "4 Accounts" Als Neuer Plan

Warum nicht:

- Unser System ist auf 2 Operatoren x 3 Personas ausgelegt.
- Die aktive Startwelle bleibt 6, solange die Produktionsqualität hält.

Anpassung:

- Wenn die Qualität bricht, pausieren wir einzelne Personas nach Signal, nicht per Bauchgefühl.

### 2. Tägliche Reels Für Alle

Warum nicht:

- Aktuelle Video-Kapazität liegt bei ca. 2 Videos pro Tag.
- Bilder und Carousels sind bewusst Baseline.

Anpassung:

- Video-Slots bleiben Premium-Lernslots.

### 3. Bot-/Fake-Engagement

Warum nicht:

- Plattformrisiko.
- Schlechte Daten.
- Langfristig schädlich.

Anpassung:

- Algorithmusfreundlich durch klare Nische, Originalität, Saves, Shares und echte Kommentare.

### 4. Rohe "Sex Sells"-Sprache In Der UI

Warum nicht:

- Wir bauen ein professionelles Operator-System.
- Der Partner muss es ernsthaft nutzen können.

Anpassung:

- Interne Begriffe:
  - Aspirationssignal
  - Statussignal
  - Attraktivitätsbias
  - Vertrauenshebel
  - Aufmerksamkeitshebel

### 5. Harte Monetarisierung Ab Tag 1

Warum nicht:

- Neue Accounts ohne Vertrauen wirken sofort wie Werbeflächen.

Anpassung:

- Offer-Fit vorbereiten.
- Ab Woche 3-4 weich testen.

## Datenmodell-Ideen

Nicht alles muss sofort in Prisma. Aber diese Felder sollten beim nächsten Schema-Schritt geprüft werden.

### ContentItem

- `hookType`
- `triggerTags`
- `primarySignal`
- `ctaType`
- `originalityStatus`
- `productionAngle`

### Persona

- `visualCode`
- `preferredTriggerTags`
- `monetizationLane`
- `storyArc`
- `activeHypothesis`

### AssetFile

- `generationPrompt`
- `visualCodeMatch`
- `originalityProof`
- `postMaterialReadiness`

### Experiment

- `triggerTag`
- `hookType`
- `format`
- `decisionThreshold`

## Empfohlene Nächste Umsetzung

Reihenfolge:

1. **Kennzahlen-Eingabe V1**  
   MetricSnapshot-Formular, Validierung und Ratenberechnung.

2. **Live 30-Tage-Kommando**  
   WarRoomTest, Tagesoutput, Video-Slots, fehlende Kennzahlen, erste Entscheidungssignale.

3. **Trigger-Tags und Originalitäts-Check**  
   Psychologische Testlogik und Plattformrisiko direkt in den Workflow bringen.

## Product Rule

Jedes Feature aus `chat.md` muss eine dieser Fragen beantworten:

- Hilft es, besseren Content zu produzieren?
- Hilft es, schneller Gewinner und Verlierer zu erkennen?
- Hilft es, Persona-Konsistenz zu sichern?
- Hilft es, Compliance- oder Plattformrisiko zu reduzieren?
- Hilft es, Monetarisierung vorzubereiten, ohne Vertrauen zu zerstören?

Wenn nicht: raus damit.
