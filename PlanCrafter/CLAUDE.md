# PlanCrafter – Claude Code Projektregeln

## Projekt-Kontext

- **App:** PlanCrafter – Fitness-Trainingsplan-Web-App (Universitätsprojekt, Modul Prototyping)
- **Ziel:** Nutzer:innen sollen in unter 2 Minuten einen individuellen Trainingsplan aus einer gefilterten Übungsdatenbank zusammenstellen können
- **Framework:** SvelteKit 5 (Svelte 5 Syntax)
- **Datenbank:** MongoDB Atlas, Datenbankname `PT_Project_PlanCrafter`
- **Styling:** Bootstrap 5.3.3 (CSS only, via CDN), Dark Theme via `src/app.css`
- **Auth:** Kein Authentifizierungssystem – `USER_ID = 'demo'` als Platzhalter in `db.js`
- **Kategorien:** Athletic, Isometrics, Kettlebell, Kraft, Mobility, Plyometrics, Rotation (7 total)

---

## Project Goal

PlanCrafter ermöglicht Nutzer:innen:

- Übungen nach Trainingskategorie zu filtern und zu durchsuchen
- Übungen per Klick zu einem persönlichen Trainingsplan hinzuzufügen
- bestehende Pläne zu verwalten und einzusehen
- Übungsdetails (Beschreibung, Schritt-für-Schritt-Anleitung) abzurufen
- eigene Übungen zu erfassen

Die App ist minimalistisch gehalten – kein Abo, kein Login, keine Überfrachtung.

---

## Kernworkflows

### Workflow 1: Training starten

1. Nutzer öffnet die Homepage
2. Nutzer sieht unter "Current Workout" den zuletzt nicht abgeschlossenen Plan
3. Nutzer tippt auf "Continue" und gelangt zu diesem Plan (`/plan`)

### Workflow 2: Übung zum Plan hinzufügen

1. Nutzer navigiert zu einer Kategorie oder der Exercises-Seite
2. Nutzer tippt auf "+"-Button einer Übung
3. Übung wird dem aktiven Plan hinzugefügt
4. Nutzer kehrt zur Liste zurück

### Workflow 3: Kategoriebasiert suchen

1. Nutzer tippt auf eine Kategorie-Kachel (Homepage oder `/categories`)
2. Übungsliste der Kategorie öffnet sich (`/categories/[slug]`)
3. Nutzer tippt auf eine Übung und sieht die Detailseite (`/exercises/[id]`)

### Workflow 4: Plan verwalten

1. Nutzer öffnet "My Plans" auf der Homepage oder `/plans`
2. Nutzer wählt einen Plan aus
3. Nutzer sieht alle Übungen des Plans (`/plans/[id]`)

### Workflow 5: Eigene Übung erfassen

1. Nutzer navigiert zu `/add-exercise`
2. Nutzer füllt das Formular aus (Name, Kategorie, Referenz)
3. Übung wird gespeichert und erscheint in der Übungsliste

---

## Seiten & UI-Anforderungen

### `/` – Homepage

- Begrüssung "Hi User" + Suchleiste
- Card: **Current Workout** – zeigt den neuesten nicht abgeschlossenen Plan mit "Continue"-Button; wenn kein solcher Plan vorhanden: "Create Plan"
- Card: **My Plans** – die 3 neuesten Pläne als Listeneinträge mit Datum und Name, "View all"-Link
- Grid: **Categories** – alle 7 Kategorien als gleich grosse Kacheln in einer einzigen Zeile, farbkodiert mit Icon
- Grid: **Explore** – 6 zufällige Übungen als 3×2-Kacheln mit Bild/Placeholder und Name

### `/categories` – Kategorienübersicht

- Liste oder Grid aller 7 Kategorien
- Jede Kategorie zeigt Icon, Name und Farbe
- Klick führt zu `/categories/[slug]`

### `/categories/[slug]` – Kategorie-Detailseite

- Header mit Kategoriename, Icon und Farbe
- Liste aller Übungen dieser Kategorie
- Jede Übung zeigt Name, bodyParts-Badges (Bootstrap) und "+"-Button zum Hinzufügen zum Plan
- Klick auf Übungsname führt zu `/exercises/[id]`

### `/exercises/[id]` – Übungsdetailseite

- Übungsname als Titel
- Kategorie-Badge (farbig)
- bodyParts-Badges
- Beschreibung (description)
- Nummerierte Schritt-für-Schritt-Anleitung (instructions)
- Referenz-Link falls vorhanden
- "+"-Button zum Hinzufügen zum aktiven Plan

### `/plan` – Aktiver Trainingsplan (nicht abgeschlossen)

- Zeigt alle Übungen des neuesten nicht abgeschlossenen Plans
- Übungen als Liste, gruppiert nach Kategorie
- Möglichkeit, Übungen zu entfernen

### `/plans` – Alle Pläne

- Chronologische Liste aller Pläne
- Jeder Eintrag zeigt Name, Datum, Anzahl Übungen
- Klick führt zu `/plans/[id]`

### `/plans/[id]` – Plandetailseite

- Planname und Datum
- Alle enthaltenen Übungen als Liste
- Zurück-Navigation

### `/add-exercise` – Eigene Übung erfassen

- Formular: Name, Kategorie (Dropdown), Referenz-URL
- Speichern legt Übung in MongoDB an (`isCustom: true`, `userId: 'demo'`)
- Nach dem Speichern: Weiterleitung zur Übungsliste oder Bestätigungsmeldung

---

## UI-Richtlinien

- **Dark Mode** durchgehend – Hintergrund `#1A1A1A`, Cards `#2A2A2A`
- **Bottom Navigation** – persistente Navigation mit 5 Punkten: Home, Exercises, Plan, Categories, Add
- **Farbakzente** – jede Kategorie hat eine definierte Farbe (siehe `data/categories.json`), wird bei Borders, Badges und Icons verwendet
- **Bootstrap-Badges** für bodyParts – `badge bg-secondary` oder farbige Variante
- **Cards** für alle Listeneinträge und Übersichten
- **Keine Modal-Dialoge** – Aktionen werden inline oder über eigene Seiten gelöst
- **Kein Bootstrap-JS** – Reaktivität übernimmt SvelteKit

---

## Konventionen

### SvelteKit

- Props nie destrukturieren: `let { data } = $props()` verwenden, im Template `data.x` (nicht `const { x } = data`)
- Datenbankzugriffe immer in `+page.server.js`, nie im Client
- Rückgabewerte immer durch `serialize()` aus `db.js` schicken (wandelt ObjectId/Date in JSON-sichere Werte um)
- Form Actions für alle schreibenden Operationen (Übung hinzufügen, Plan erstellen, etc.)

### MongoDB

- `categoryId` wird als Slug-String gespeichert (z. B. `"kraft"`), nicht als ObjectId
- Collections: `categories`, `exercises`, `plans`, `users`
- Kein Seed-Skript – Daten werden manuell via MongoDB Compass importiert

### Code

- Keine unnötigen Abstraktionen oder Features über den aktuellen Aufgabenumfang hinaus
- Keine Kommentare ausser wenn das *Warum* nicht offensichtlich ist
- Kein Bootstrap-JS – Reaktivität übernimmt SvelteKit

---

## Wichtige Dateien

| Datei | Zweck |
| --- | --- |
| `src/lib/server/db.js` | MongoDB-Verbindung, `serialize()`, `USER_ID` |
| `src/routes/+layout.svelte` | Bootstrap CDN, globales Layout, Bottom-Navigation |
| `src/app.css` | Dark Theme, CSS-Variablen |
| `data/exercises.json` | Alle 65 Übungen (für Compass-Import) |
| `data/categories.json` | Alle 7 Kategorien (für Compass-Import) |
| `scripts/add_descriptions.py` | Hilfsskript zum Befüllen von description/instructions |
| `README.md` | Projektdokumentation (Kapitelstruktur darf nicht verändert werden) |

---

## Routen-Übersicht

```text
src/routes/
  +layout.svelte              # Globales Layout, Bottom-Navigation
  +page.svelte                # Homepage
  +page.server.js             # Load: activePlan, plans, categories, explore
  categories/
    +page.svelte              # Alle Kategorien
    +page.server.js
    [slug]/
      +page.svelte            # Übungen einer Kategorie
      +page.server.js
  exercises/
    [id]/
      +page.svelte            # Übungsdetailseite
      +page.server.js
  plan/
    +page.svelte              # Aktiver (nicht abgeschlossener) Trainingsplan
    +page.server.js
  plans/
    +page.svelte              # Alle Pläne
    +page.server.js
    [id]/
      +page.svelte            # Plandetailseite
      +page.server.js
  add-exercise/
    +page.svelte              # Formular eigene Übung
    +page.server.js
```

---

## Dokumentation

Nach **jeder Änderung** prüfen, ob die README.md aktualisiert werden muss:

- **3.4.1** – neue Screens, Workflows oder UI-Entscheide ergänzen
- **3.4.2** – neue Technologien, Routen, Komponenten oder Architekturentscheide nachtragen
- **6.1** – KI-Einsatz aktuell halten (neue Bereiche, in denen KI genutzt wurde)

Wenn etwas unklar ist: kurz fragen, ob die Doku angepasst werden soll.

---

## Definition of Done

Eine **Seite** ist fertig wenn:

- sie im Browser funktioniert und die definierten Workflows unterstützt
- Daten aus MongoDB geladen und korrekt angezeigt werden
- schreibende Aktionen (falls vorhanden) über Form Actions funktionieren
- Navigation zu und von der Seite funktioniert
- das UI den Richtlinien entspricht (Dark Theme, Bootstrap-Badges, Farbakzente)
- keine Console-Errors im Browser

Das **Projekt** ist fertig wenn:

- alle 8 Routen implementiert sind
- alle 5 Kernworkflows funktionieren
- README.md vollständig ausgefüllt ist (inkl. Screenshots)
- KI-Deklaration aktuell ist
- alle Daten in MongoDB importiert sind
