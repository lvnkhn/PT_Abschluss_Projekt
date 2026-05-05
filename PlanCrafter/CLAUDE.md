# PlanCrafter – Claude Code Projektregeln

## Dokumentation

Nach **jeder Änderung** prüfen, ob die README.md aktualisiert werden muss:
- **3.4.1** – neue Screens, Workflows oder UI-Entscheide ergänzen
- **3.4.2** – neue Technologien, Routen, Komponenten oder Architekturentscheide nachtragen
- **6.1** – KI-Einsatz aktuell halten (neue Bereiche, in denen KI genutzt wurde)

Wenn etwas unklar ist: kurz fragen, ob die Doku angepasst werden soll.

---

## Projekt-Kontext

- **App:** PlanCrafter – Fitness-Trainingsplan-Web-App
- **Framework:** SvelteKit 5 (Svelte 5 Syntax)
- **Datenbank:** MongoDB Atlas, Datenbankname `PT_Project_PlanCrafter`
- **Styling:** Bootstrap 5.3.3 (CSS only, via CDN), Dark Theme via `src/app.css`
- **Auth:** Kein Authentifizierungssystem – `USER_ID = 'demo'` als Platzhalter in `db.js`

---

## Konventionen

### SvelteKit
- Props nie destrukturieren: `let { data } = $props()` verwenden, im Template `data.x` (nicht `const { x } = data`)
- Datenbankzugriffe immer in `+page.server.js`, nie im Client
- Rückgabewerte immer durch `serialize()` aus `db.js` schicken (wandelt ObjectId/Date in JSON-sichere Werte um)

### MongoDB
- `categoryId` wird als Slug-String gespeichert (z. B. `"kraft"`), nicht als ObjectId
- Collections: `categories`, `exercises`, `plans`, `users`
- Kein Seed-Skript – Daten werden manuell via MongoDB Compass importiert

### Daten
- Übungs-Importdateien liegen unter `data/exercises/` (einzeln pro Kategorie) und `data/exercises.json` (kombiniert)
- `data/categories.json` enthält alle 7 Kategorien mit `name`, `slug`, `color`, `icon`

### Code
- Keine unnötigen Abstraktionen oder Features über den aktuellen Aufgabenumfang hinaus
- Keine Kommentare ausser wenn das *Warum* nicht offensichtlich ist
- Kein Bootstrap-JS – Reaktivität übernimmt SvelteKit

---

## Wichtige Dateien

| Datei | Zweck |
|---|---|
| `src/lib/server/db.js` | MongoDB-Verbindung, `serialize()`, `USER_ID` |
| `src/routes/+layout.svelte` | Bootstrap CDN, globales Layout |
| `src/app.css` | Dark Theme, CSS-Variablen |
| `data/exercises.json` | Alle 148 Übungen (für Compass-Import) |
| `data/categories.json` | Alle 7 Kategorien (für Compass-Import) |
| `scripts/add_descriptions.py` | Hilfsskript zum Befüllen von description/instructions |
| `README.md` | Projektdokumentation (Struktur darf nicht verändert werden) |
