# Sprache und Begriffe - Attitude Factory Operator OS

Status: verbindlich ab 2026-04-30

## Grundsatz

Attitude Factory Operator OS wird Deutsch-first entwickelt. Der Partner soll das System ohne Englischkenntnisse bedienen, verstehen und mitpflegen können.

Alles, was ein Nutzer sieht, ist auf Deutsch:

- Navigation
- Buttons
- Tabellenköpfe
- Statuslabels
- leere Zustände
- Fehlermeldungen
- Demo- und Seed-Daten
- Persona-Notizen
- Entscheidungslabels
- Checklisten
- Onboarding- und Hilfetexte

Englisch bleibt nur dort erlaubt, wo es ein Markenname, ein bewusst gewählter Produktname oder ein technischer Framework-Begriff ist.

## Produktnamen

- **Attitude Factory** bleibt der Markenname.
- **Operator OS** darf als Produktname stehen bleiben, weil der Nutzer ihn ausdrücklich gut findet.
- Sichtbare Module bekommen deutsche Namen.
- "War Room" wird in der Oberfläche zu **30-Tage-Kommando**. In Strategiegesprächen darf "War Room" als Bild weiterleben, aber nicht als primäres UI-Label.

## Entwicklungsregel

Produkt- und Domänensprache ist Deutsch. Das bedeutet:

- UI-Texte werden direkt auf Deutsch geschrieben, nicht später übersetzt.
- Statuswerte bekommen deutsche Anzeigenamen und, wenn möglich, deutsche Slugs ohne Umlaute.
- Kommentare zu Fachlogik dürfen Deutsch sein.
- Technische Code-Konventionen dürfen Englisch bleiben, wenn das Framework dadurch klarer bleibt.
- Keine gemischten Oberflächen wie "Content erstellen", "Needs Asset", "Metrics fehlen".

Pragmatische Code-Grenze:

- Sichtbare Routen dürfen Deutsch sein, z.B. `/kommandozentrale`.
- Prisma-/TypeScript-Modellnamen dürfen Englisch bleiben, wenn das die Entwicklung mit Libraries, Doku und KI-Agenten stabiler macht.
- Alle sichtbaren Anzeigenamen, Statuslabels und Fehlermeldungen müssen aus deutschen Label-Quellen kommen.

Empfohlene Slug-Schreibweise:

- `material_fehlt`
- `in_pruefung`
- `bereit`
- `veroeffentlicht`
- `kennzahlen_fehlen`
- `gewinner_kandidat`
- `schwaches_signal`
- `blockiert`

## Modulnamen

| Intern/alt | UI-Name Deutsch | Zweck |
|---|---|---|
| Command Center | Kommandozentrale | täglicher Startpunkt |
| 30-Day War Room | 30-Tage-Kommando | Teststatus und Druckfläche |
| Content Factory | Content-Produktion | Ideen, Hooks, Captions, Assets, Veröffentlichungsvorbereitung |
| Asset Library | Medien | Setcards, Referenzen, Postbilder, Videos, Prompts |
| Research Inbox | Recherche-Eingang | Trends, Hooks, Konkurrenz, Quellen |
| Metrics | Kennzahlen | Reichweite, Saves, Shares, Follows, Ableitungen |
| Decision Engine | Entscheidungslogik | manuelle Signale und nächste Aktionen |
| Offer Readiness | Angebots-Check | Affiliate- und Monetarisierungsbereitschaft |
| Compliance | Regelcheck | Disclosure, Claims, Plattformrisiken |
| Settings | Einstellungen | Nutzer, System, spätere Integrationen |

## Statuslabels

| Status | UI-Label |
|---|---|
| Draft | Entwurf |
| Idea | Idee |
| Briefed | Gebrieft |
| Assets Needed | Material fehlt |
| Assets Ready | Material bereit |
| Review | Prüfung |
| Ready To Post | Bereit zum Posten |
| Posted | Gepostet |
| Metrics Needed | Kennzahlen fehlen |
| Analyzed | Ausgewertet |
| Repurpose | Wiederverwenden |
| Kill / Pause | Stoppen / Pausieren |
| Blocked | Blockiert |

## Entscheidungssignale

| Signal | UI-Label |
|---|---|
| Needs Metrics | Kennzahlen fehlen |
| Needs Review | Prüfung nötig |
| Winner Candidate | Gewinner-Kandidat |
| Weak Signal | Schwaches Signal |
| Video Slot Candidate | Videoeinsatz-Kandidat |
| Double Down | Ausbauen |
| Kill / Pause | Stoppen / Pausieren |
| Repurpose | Wiederverwenden |

## Tonalität

Die Oberfläche spricht knapp, klar und operativ:

- "Heute offen"
- "Material fehlt"
- "Kennzahlen fehlen"
- "Ausbauen"
- "Blockiert"
- "Prüfung nötig"

Nicht verwenden:

- verspielte Motivationssprache
- englische SaaS-Floskeln
- lange Erklärtexte in der Hauptoberfläche
- Marketing-Sätze in Arbeitsflächen

## Merksatz

Das Produkt soll sich anfühlen wie eine Kommandozentrale für Reichweitenaufbau, nicht wie ein Kalender mit hübschen Karten.
