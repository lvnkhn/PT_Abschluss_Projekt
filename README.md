# Projektdokumentation - [Projekttitel]

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage
- **Problem:** Viele Sportler:innen und Studierende verbringen unverhältnismässig viel Zeit damit, passende Übungen zu recherchieren und einen sinnvollen Trainingsplan zusammenzustellen. Die schiere Menge an Trainingsmethoden – von klassischem Krafttraining über Mobility und Plyometrics bis hin zu Kettlebell und Agility – führt zu Entscheidungsmüdigkeit und Unsicherheit. Bestehende Lösungen sind entweder zu komplex und abo-basiert (z. B. Freeletics, Fitbod), zu starr mit vorgefertigten Plänen, oder reine Nachschlagewerke ohne interaktive Planungsfunktion (z. B. MuscleWiki, ExRx.net). Es fehlt ein schlankes Tool, das Übungen nach Muskelgruppe *und* Trainingskategorie filterbar macht und mit wenigen Klicks einen individuellen Trainingsplan generiert.
- **Ziele:**
  - Eine Web-App entwickeln, mit der Nutzer:innen in unter 2 Minuten einen individuellen Trainingsplan zusammenstellen können
  - Übungen sind filterbar nach Muskelgruppe und Trainingskategorie (Athletic, Mobility, Plyometrics, Isometrics, Kraft, Kettlebell, Rotation)
  - Per Klick werden Übungen in eine visuelle Trainingsplan-Übersicht übernommen
  - Jede Trainingskategorie verfügt über eine eigene Detailseite mit allen zugehörigen Übungen
  - Minimalistisches, intuitives UI – keine Registrierung, kein Abo, keine Überfrachtung
- **Primäre Zielgruppe:** Ambitionierte Hobby-Athlet:innen und Studierende mit Fitness-Interesse, die mehrere Trainingsstile kombinieren und sich beim Planen Zeit sparen möchten. Sekundär auch Fitness-Einsteiger:innen, die eine übersichtliche, gefilterte Übungsauswahl mit tiefer Einstiegshürde suchen.
- **Weitere Stakeholder [Optional]:** Trainer:innen und Coaches, die das Tool nutzen könnten, um schnell Trainingsvorlagen für ihre Klient:innen zu erstellen.
## 2. Lösungsidee
 
- **Kernfunktionalität:** Der zentrale Workflow der Web-App gliedert sich in drei Schritte:
  1. **Filtern** – Nutzer:innen wählen eine oder mehrere Muskelgruppen und/oder Trainingskategorien aus.
  2. **Auswählen** – Alle passenden Übungen werden angezeigt. Per Klick auf eine Übung wird diese direkt in die Trainingsplan-Übersicht aufgenommen.
  3. **Übersicht** – Der zusammengestellte Trainingsplan wird als kompakte visuelle Übersicht dargestellt, die alle gewählten Übungen für die aktuelle Session enthält.
  Ergänzend verfügt jede Trainingskategorie (Athletic, Mobility, Plyometrics, Isometrics, Kraft, Kettlebell, Rotation) über eine eigene Detailseite, auf der alle Übungen dieser Kategorie aufgelistet und beschrieben sind.
- **Annahmen [Optional]:**
  - Nutzer:innen wissen grundsätzlich, welche Muskelgruppe(n) sie trainieren möchten, benötigen aber Unterstützung bei der konkreten Übungsauswahl.
  - Die Kombination aus Muskelgruppen-Filter und Kategorien-Filter bietet genügend Steuerung, um relevante Übungen schnell einzugrenzen.
  - Ein minimalistischer «Klick-zum-Plan»-Workflow wird gegenüber algorithmisch generierten Plänen bevorzugt, da er den Nutzer:innen mehr Kontrolle überlässt.
- **Abgrenzung [Optional]:**
  - Kein automatisch generierter Trainingsplan (kein AI-Coach, keine Periodisierung)
  - Kein Tracking von Gewichten, Sätzen oder Wiederholungen – der Fokus liegt auf der Planerstellung, nicht auf dem Logging
  - Kein Nutzer-Account-System, keine Social Features
  - Keine eigene Video-/Animations-Produktion – es wird auf bestehende Quellen (z. B. YouTube, MuscleWiki) verlinkt
## 3. Vorgehen & Artefakte
 
Die Durchführung erfolgt phasenbasiert; nachfolgend sind die wichtigsten Ergebnisse je Phase dokumentiert.
 
### 3.1 Understand & Define
 
- **Zielgruppenverständnis:**
  **Problemräume:**
  - Viele Sportler:innen und Studierende investieren unverhältnismässig viel Zeit in die Recherche passender Übungen und das Zusammenstellen eines sinnvollen Trainingsplans.
  - Die Menge an Trainingsmethoden und -philosophien (Kraft, Mobility, Plyometrics, Isometrics, Kettlebell, Rotation) führt zu Entscheidungsmüdigkeit – besonders wenn mehrere Stile kombiniert werden sollen.
  - Social Media präsentiert ständig neue Übungen, die zwar gespeichert, aber selten strukturiert in den Trainingsalltag integriert werden.
  - Bestehende Tools sind entweder überladene Coaching-Apps mit Abo-Modell, starre vorgefertigte Pläne oder reine Nachschlagewerke ohne Planungsfunktion.
  - Athlet:innen, die mehrere Disziplinen kombinieren (z. B. Kraft + Plyometrics + Mobility), finden in klassischen Bodybuilding-Apps kaum passende Inhalte.
  **Personas:**
  | Nutzer | Bedürfnisse | Kontext / Herausforderungen | HMW (How Might We) |
  |---|---|---|---|
  | **Ambitionierte Athlet:innen** (Hobby- und Wettkampfsport, kombinieren mehrere Trainingsstile) | Schnelle, flexible Plan-Erstellung über mehrere Kategorien hinweg (z. B. Kraft + Plyometrics + Mobility); klare Übersicht über die geplante Session | Wechselnde Trainingsziele je nach Saison/Phase, begrenzte Zeit, sehr viele in Frage kommende Übungen, hoher Anspruch an Variation | Wie könnten wir Athlet:innen ermöglichen, mit wenigen Klicks einen individuellen Plan über mehrere Trainingskategorien hinweg zusammenzustellen? |
  | **Studierende mit Fitness-Interesse** | Zeitersparnis, einfache Bedienung, geringe Einstiegshürde, kein Abo | Stress durch Studium, knappe Zeitfenster zwischen Vorlesungen, wenig Erfahrung mit strukturierter Trainingsplanung, begrenztes Budget | Wie könnten wir die Trainingsplan-Erstellung so unkompliziert gestalten, dass auch Studierende ohne Vorwissen sie in unter 2 Minuten nutzen können? |
  | **Fitness-Einsteiger:innen** | Übersichtliche, gefilterte Auswahl; Sicherheit bei der Übungswahl; visuelle Orientierung | Unsicherheit bei der Auswahl, Angst vor Fehlern oder Verletzungen, Überforderung durch zu viele Optionen, fehlendes Vokabular | Wie könnten wir Einsteiger:innen helfen, passende Übungen je Muskelgruppe zu finden und so motiviert dranzubleiben? |
  | **Trainer:innen / Coaches** (sekundäre Zielgruppe) | Schnelles Erstellen von Vorlagen, die sie an Klient:innen weitergeben können | Wenig Zeit zwischen Sessions, Bedarf an strukturierten, wiederverwendbaren Plänen | Wie könnten wir Coaches ermöglichen, Trainingspläne effizient als Vorlage zu erstellen und zu teilen? |
- **Wesentliche Erkenntnisse:**
  - Bestehende Fitness-Apps (Freeletics, Fitbod, Jefit) sind entweder stark algorithmisch/abo-basiert oder fokussieren sich fast ausschliesslich auf klassisches Krafttraining. Die Kombination verschiedener Trainingsstile wird kaum in einem Tool abgedeckt.
  - Reine Nachschlagewerke wie Lift Manual, ExRx.net oder MuscleWiki bieten umfassende Übungsdatenbanken, jedoch keine interaktive Planerstellung.
  - Nutzer:innen wünschen sich vor allem Geschwindigkeit, Übersichtlichkeit und Filtermöglichkeiten nach Muskelgruppe und Trainingsart – nicht zwingend mehr Inhalte.
  - Eine visuelle Übersicht des zusammengestellten Plans wirkt motivierend und verringert die Wahrscheinlichkeit, eine Session abzubrechen.
  - Studierende und Berufstätige bewerten Zeitersparnis und reibungslose UX höher als Premium-Features (Statistiken, Social Sharing, Gamification).
  - Der USP liegt in der Kombination aus breiter Kategorienabdeckung (Athletic, Plyometrics, Mobility etc.) und einem minimalistischen Klick-zum-Plan-Workflow – dort wo bestehende Lösungen entweder zu schwer oder zu eingeschränkt sind.

### 3.2 Sketch
 
Im Rahmen einer Crazy-8s-Session wurden zwei Varianten für die App-Struktur skizziert.
 
- **Variantenüberblick:**
  | | Variante A – Karussell-Homepage | Variante B – Dashboard-Homepage |
  |---|---|---|
  | **Homepage** | Grosses Karussell mit Übungsvorschlägen, weiterklicken nötig um an Kernfunktionen zu gelangen | Dashboard-Layout mit mehreren Containern: aktueller Plan, My Plans, Kategorien, Explore – alles auf einen Blick |
  | **Navigation** | Home, Your Plan, Exercises, Categories + separate Help-Seite | Home, Your Plan, Exercises, Categories + Add Exercises (ersetzt Help) |
  | **Help / Add** | Eigene Help-Seite mit externen Links (Lift Manual, Workout Wiki) | Help-Seite wird zu einer **Add Exercise**-Seite umfunktioniert: Nutzende können eigene Übungen anlegen (Name, Bodypart, Category, References) |
  | **Exercises** | Kategorie-Filter via Checkboxen, Übungskarten mit Bild, Beschreibung und «Add to Plan» | Gleiche Grundstruktur, zusätzlich Checkbox pro Übung für schnelleres Hinzufügen |
  | **Your Plan** | Übungen gruppiert nach Kategorie als Liste | Gleich, ergänzt um «Add to Plan»-Button und Checkboxen |
  | **My Plans** | Chronologische Liste mit Datum und Titel | Gleich, ergänzt um Status-Spalte (complete / done) |
  | **Categories** | Kategorie-Liste mit Klick auf Detailseite | Gleich, zusätzlich farbkodierte Icons pro Kategorie |
  | **Explore** | 3×3-Grid mit Übungsbildern | Gleich |
  | **Detail Page** | Übungsillustration, Beschreibung, nummerierte Schritte | Gleich, ergänzt um Referenz-Link |
- **Skizzen:**
  - **Variante A** (Crazy-8s, Seite 1): Karussell-basierte Homepage mit separater Help-Seite. Alle Kernfunktionen (Plan, Exercises, Categories) nur über Navigation erreichbar.
  - **Variante B** (überarbeitete Skizze, Seite 3): Dashboard-Homepage mit «Hi \<User\>»-Begrüssung, Suchleiste, Container für Recent Workout, My Plans, Categories und Explore. Help-Seite durch Add Exercise ersetzt. Floating «+»-Button für schnellen Zugriff.
### 3.3 Decide
 
- **Gewählte Variante & Begründung:** Variante B – Dashboard-Homepage. Die Homepage ist der Einstiegspunkt und prägt den ersten Eindruck am stärksten. Das ursprüngliche Karussell (Variante A) nutzte den verfügbaren Platz nicht aus und zwang Nutzende, aktiv weiterzuklicken, um an die Kernfunktionen zu gelangen. Das Dashboard-Layout zeigt alle wichtigen Bereiche (aktueller Plan, My Plans, Kategorien, Explore) direkt auf der Startseite als Container an.
  **Entscheidkriterien:**
  - *Sofortiger Überblick:* Dashboard zeigt alle Kernfunktionen ohne zusätzliche Navigation.
  - *Feedback-getrieben:* Drei Rückmeldungen aus der Sketch-Session flossen direkt ein (siehe unten).
  - *Mehrwert statt Leerseite:* Die überflüssige Help-Seite wurde zur Add Exercise-Seite umgewandelt – Nutzende können eigene Übungen anlegen, was die App über die vordefinierte Datenbank hinaus flexibel macht.
  **Erhaltenes Feedback und Einfluss auf die Entscheidung:**
  1. Die Help-Seite wirkte als eigene Hauptseite überflüssig → Umfunktionierung zu einer **Add Exercise**-Seite mit Formular (Name, Bodypart, Category, References) und Liste eigener Übungen.
  2. Die Homepage sollte nutzerfreundlicher gestaltet werden, indem die wichtigsten Features als Container auf derselben Seite dargestellt werden → **Dashboard-Layout** mit Containern für Recent Workout, My Plans, Categories und Explore.
  3. Kategorien sollen visuell und funktional klar unterscheidbar sein → **Farbkodierung und Icons** pro Kategorie; Überschneidungen werden später über Tags abgebildet.
- **End-to-End-Ablauf:** _[Beschreibung inkl. User Journey Map]_  
- **Mockup:** _[URL, z. B. Figma; Screenshots mit kurzen Beschreibungen]_  

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
**TODO** Anpassen und Screenshots einfügen (Final version)**TODO**
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die technische Umsetzung]_
- **User Interface Design:** _[wichtige Screens: Screenshots mit kurzen Erläuterungen]_  
- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_
## 3.4 Prototype

### 3.4.1 Entwurf (Design)

#### Informationsarchitektur

Der Prototyp ist um fünf Hauptbereiche organisiert, die über eine persistente Bottom-Navigation jederzeit erreichbar sind:

- **Home:** Einstiegspunkt mit aktuellem Workout, eigenen Plänen und Kategorien
- **Exercises:** Übungsliste mit Filterfunktion
- **Your Plan:** Aktiver Trainingsplan
- **Categories:** Übungen nach Trainingsart gruppiert
- **Add:** Formular zum Erfassen eigener Übungen

Die Navigationsstruktur ist flach gehalten – alle zentralen Funktionen sind mit maximal zwei Taps erreichbar. Detailansichten öffnen sich kontextuell aus den Listenansichten.

#### User Interface Design

Die wichtigsten Screens des Prototyps und ihre Interaktionen:

- **Home:** Tap auf "Current Workout" startet das aktive Training. Pläne und Kategorien sind direkt anwählbar.
- **Exercises:** Filter-Chips schalten zwischen Trainingsarten um. Der "+"-Button fügt eine Übung dem Plan hinzu und kehrt zur Liste zurück.
- **Your Plan:** Zeigt die hinzugefügten Übungen gruppiert nach Kategorie.
- **Categories:** Tap auf eine Kategorie öffnet die zugehörige Übungsliste.
- **Add Exercise:** Formular mit Dropdown für Kategorien; "Save Exercise" speichert und kehrt zur Übersicht zurück.
- **Übungsdetail:** Zeigt Bild, Tags und Schritt-für-Schritt-Anweisungen zur Übung.

#### Designentscheidungen

- **Dark Mode:** Reduziert Blendwirkung beim Training, schont den Akku auf OLED-Displays und entspricht den Konventionen gängiger Fitness-Apps.
- **Bottom-Navigation:** Permanente Erreichbarkeit der fünf Hauptbereiche reduziert den Navigationsaufwand und folgt etablierten Mobile-Patterns.
- **Card-basiertes Layout:** Bietet gute Lesbarkeit, Platz für Bildmaterial und ausreichend grosse Touch-Flächen.
- **"+"-Button für Schnellaktionen:** Übungen lassen sich direkt aus der Liste zum Plan hinzufügen, ohne Kontextwechsel.
- **Farbliche Akzente pro Kategorie:** Verbessern die Wiedererkennbarkeit und unterstützen die visuelle Orientierung.
- **Flache Navigationshierarchie:** Hält den Klickpfad kurz und vermeidet unnötige Zwischenebenen.

#### Workflows & Testanleitung

Alle Funktionalitäten können lokal unter `http://localhost:5173` getestet werden (`npm run dev` im Ordner `PlanCrafter`). Die App verwendet `userId: "demo"` für alle Daten — kein Login erforderlich.

---

##### Workflow 1: Übungen durchsuchen

1. Navigation → *Exercises* → alle 65 Übungen werden geladen
2. Kategorie-Chip (z. B. «Kraft») antippen → Liste filtert auf diese Kategorie
3. Übung antippen → Detailseite mit Bild, Kategorie-Badge, bodyParts-Badges, Schritt-für-Schritt-Anleitung und Referenz-Link

##### Workflow 2: Kategoriebasiert suchen

1. Navigation → *Categories* → alle 7 Kategorien mit Übungsanzahl
2. Kategorie antippen → Übungsliste dieser Kategorie
3. Übung antippen → Detailseite (Zurück-Button navigiert zur Kategorie zurück)

##### Workflow 3: Plan erstellen und Workout durchführen

1. Auf einer Übungsliste (Exercises oder Categories) den **+**-Button antippen → Übung wird einem Draft-Plan hinzugefügt (Button wird grün mit ✓) und ein Toast-Popup erscheint oben rechts mit dem Übungsnamen und einem «Zum Plan →»-Link
2. Mehrere Übungen hinzufügen
3. Navigation → *Your Plan* (oder Toast-Link antippen) → Draft-Plan sichtbar mit allen hinzugefügten Übungen
4. Unerwünschte Übungen mit **✕** entfernen (live, kein Reload)
5. Plan benennen (Textfeld) → **Speichern** → Plan wird gespeichert, Status wechselt zu «Aktiv»
6. Übungen während des Workouts einzeln abhaken (live, Fortschrittsbalken aktualisiert sich)
7. Sobald alle Übungen erledigt: Plan wird automatisch als «Abgeschlossen» markiert, Datum wird auf heute gesetzt

##### Workflow 4: Gespeicherte Pläne verwalten

1. Navigation → *Your Plan* → Scrolldown zeigt alle gespeicherten Pläne
2. Plan antippen → Detailseite mit Übungsliste und Abschlussdatum
3. **Jetzt starten** → Plan wird zurückgesetzt (alle Haken entfernt) und als aktiver Workout geöffnet
4. Home → *My Plans* zeigt die 2 neuesten Pläne; **View all** → vollständige Planliste

##### Workflow 5: Eigene Übung erfassen

1. Navigation → *Add* → Formular mit Name, Kategorie (Dropdown), Referenz-URL
2. **Speichern** → eigene Übung wird in MongoDB gespeichert (`isCustom: true`)
3. Übung erscheint in der Exercises-Liste der gewählten Kategorie

##### Workflow 6: Home-Navigation

1. *Current Workout*-Card zeigt den aktiven/nicht abgeschlossenen Plan → Antippen öffnet *Your Plan*
2. *My Plans* zeigt die 2 neuesten Pläne → direkt anwählbar
3. *Categories*-Kacheln → direkt zur Kategorie-Detailseite
4. *Explore*-Grid → direkt zur Übungsdetailseite
5. «PlanCrafter»-Schriftzug oben → navigiert immer zur Homepage


#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:**
  - **Frontend:** SvelteKit 5 (Svelte 5 Syntax, File-based Routing, SSR via `+page.server.js`)
  - **Styling:** Bootstrap 5.3.3 (CSS only, eingebunden via CDN in `+layout.svelte`), eigenes Dark-Theme via `app.css` mit CSS-Variablen
  - **Backend:** SvelteKit Server-Routes (Node.js), MongoDB Node.js Driver v7
  - **Datenbank:** MongoDB Atlas (Cloud, Cluster `Cluster1DM`), Datenbankname `PT_Project_PlanCrafter`
  - **Datenverwaltung lokal:** JSON-Dateien unter `data/` für den manuellen Import via MongoDB Compass

- **Tooling:**
  - Visual Studio Code mit SvelteKit- und MongoDB-Erweiterungen
  - MongoDB Compass für visuellen Datenbankzugriff und manuellen Import der JSON-Dateien
  - Node.js / npm für lokale Entwicklung (`npm run dev`)
  - Python 3 für das Hilfsskript `scripts/add_descriptions.py` zur Datenvorbereitung
  - Vite als Build-Tool (via SvelteKit)

- **Struktur & Komponenten:**

  ```text
  src/
  ├── lib/
  │   ├── server/
  │   │   ├── db.js              # MongoDB-Verbindung, serialize(), USER_ID
  │   │   └── planHelper.js      # Shared-Helfer: Draft-Plan holen/erstellen, Übung hinzufügen
  │   └── toast.svelte.js        # Reaktiver Toast-State (Svelte-5-Klasse, seitenübergreifend)
  ├── routes/
  │   ├── +layout.svelte         # Bootstrap CDN, globales Layout, Bottom-Navigation
  │   ├── +page.svelte           # Homepage
  │   ├── +page.server.js        # Load: activePlan, myPlans, categories, explore
  │   ├── categories/
  │   │   ├── +page.svelte       # Alle 7 Kategorien als Grid
  │   │   ├── +page.server.js
  │   │   └── [slug]/
  │   │       ├── +page.svelte   # Übungen einer Kategorie mit "+"-Button
  │   │       └── +page.server.js # Load + addToPlan Action
  │   ├── exercises/
  │   │   └── [id]/
  │   │       ├── +page.svelte   # Übungsdetailseite (Bild, Badges, Schritte, Ref-Link)
  │   │       └── +page.server.js # Load + addToPlan Action
  │   ├── plan/
  │   │   ├── +page.svelte       # Draft/Aktiver Plan (Übungen entfernen, benennen, abhaken)
  │   │   └── +page.server.js    # Load + saveName / toggleDone / removeExercise Actions
  │   ├── plans/
  │   │   ├── +page.svelte       # Alle gespeicherten Pläne
  │   │   ├── +page.server.js
  │   │   └── [id]/
  │   │       ├── +page.svelte   # Plandetailseite mit "Jetzt starten"-Button
  │   │       └── +page.server.js # Load + restart Action
  │   └── add-exercise/
  │       ├── +page.svelte       # Formular eigene Übung erfassen
  │       └── +page.server.js    # addExercise Action (isCustom: true)
  └── app.css                    # Dark Theme, CSS-Variablen
  ```

  Jede Seite besteht aus einem `+page.svelte` (UI) und einem `+page.server.js` (Datenbankzugriff). Die DB-Verbindung wird einmalig in `db.js` aufgebaut und als Singleton gehalten. `planHelper.js` kapselt die geteilte Logik zum Erstellen und Befüllen von Draft-Plänen, damit `exercises/[id]` und `categories/[slug]` keinen duplizierten Code enthalten.

- **Daten & Schnittstellen:**
  - MongoDB Atlas mit 4 Collections: `categories`, `exercises`, `plans`, `users`
  - `exercises.categoryId` verweist als Slug-String (z. B. `"kraft"`) auf `categories.slug` — bewusst ohne ObjectId-Referenzen, um den manuellen Import zu vereinfachen
  - Alle 65 Übungen sind in `data/exercises.json` als flaches Array gespeichert und wurden via Compass importiert
  - `serialize()` in `db.js` wandelt MongoDB-Dokumente (ObjectId, Date) in JSON-sichere Werte um, bevor sie an SvelteKit-Load-Funktionen zurückgegeben werden
  - `USER_ID = 'demo'` dient als Platzhalter, da kein Authentifizierungssystem implementiert ist
  - **Plan-Datenmodell:** Pläne durchlaufen drei Status: `draft` (noch nicht benannt) → `active` (Workout läuft) → `completed` (alle Übungen abgehakt). Übungsdetails (Name, imageUrl) werden denormalisiert direkt im Plan-Dokument eingebettet, um Joins zu vermeiden
  - **Reaktivität:** `use:enhance` (SvelteKit) sendet Form-Actions per Fetch ohne Reload; `update({ reset: false })` löst die Load-Funktion erneut aus, sodass UI-Updates sofort sichtbar sind. Berechnete Werte (`doneCount`, `isDraft`) werden mit Svelte-5-`$derived()` reaktiv gehalten
  - **Form Actions** decken alle schreibenden Operationen ab: `addToPlan`, `saveName`, `toggleDone`, `removeExercise`, `restart` — jede in der `+page.server.js` der zugehörigen Route

- **Deployment:** Lokale Entwicklungsumgebung (`http://localhost:5173`), kein produktives Deployment

- **Besondere Entscheidungen:**
  - `categoryId` als Slug-String statt ObjectId: Vereinfacht den manuellen Datenimport erheblich, da keine Cross-Collection-Referenzen beim Import in Compass notwendig sind
  - Kein Seed-Skript: Testdaten wurden bewusst manuell via MongoDB Compass importiert, um die Datenkontrolle beim Entwickler zu behalten
  - Bootstrap nur als CSS: Auf die Bootstrap-JS-Komponenten wurde verzichtet, da SvelteKit die Reaktivität selbst übernimmt und kein jQuery-Overhead gewünscht war
  - Denormalisierte Übungsdaten im Plan: Name und Bild-URL einer Übung werden beim Hinzufügen direkt ins Plan-Dokument kopiert. Dadurch können Pläne korrekt angezeigt werden, auch wenn die ursprüngliche Übung später umbenannt oder gelöscht wird
  - `history.back()` für Zurück-Navigation: Detail-Seiten von Übungen nutzen `history.back()` statt eines fixen Links, damit der Zurück-Button kontextabhängig funktioniert (von Exercises-Liste, Categories-Seite oder Homepage)

### 3.5 Validate
- **URL der getesteten Version** (separat deployt)
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
- **Vorgehen:** _[moderiert/unmoderiert; remote/on-site]_  
- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_  
- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2-4 Sätze]_  
- **Abgeleitete Verbesserungen:** _[Anforderungen, die als nächstes umgesetzt werden sollten, priorisiert, kurz begründet; falls Verbesserungen im Prototyp konkret umgesetzt wurden: In Kap. 4 dokumentieren]_  

## 4. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### _[4.x Kurzbeschreibung / Titel]_  
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Wo umgesetzt:** _[Wie und wo wurde es gemacht? Frontend, Backend, Datenbank?]_  
- **Referenz:** _[Wo wird die Erweiterung auch noch beschrieben, z.B. Screenshot oder Beschreibung in einem anderen Kapitel]_  
- **Aus Evaluation abgeleitet?:** _[Wurde diese Erweiterung als Folge eines in der Evaluation identifizierten Issues implementiert?]_  

> Das folgende **Beispiel** wurde bewusst kurz gehalten. Erweiterungen dürfen auch ausführlicher beschrieben werden.

### 4.1 Tabelle nach Kategorien filtern
- **Beschreibung & Nutzen:** Tabelle X kann nach Kategorie gefiltert werden, weil User typischerweise nur an einer bestimmten Kategorie interessiert sind.  
- **Wo umgesetzt:** 
  - **Frontend:** Tabelle mit Dropdown in Datei ...
  - **Backend:** Form Action ... in Datei ...
  - **Datenbank:** MongoDB-Query in Datei ...
- **Referenz:** Screenshot in Kap. x.y
- **Aus Evaluation abgeleitet?:** Ja, Issue x.y

## 5. Projektorganisation [Optional]
Beispiele:
- **Repository & Struktur:** _[Link; kurze Strukturübersicht]_  
- **Issue-Management:** _[Vorgehen kurz beschreiben]_  
- **Commit-Praxis:** _[z. B. sprechende Commits]_

## 6. KI-Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools

- **Eingesetzte Tools**: Claude Code (Modell: claude-sonnet-4-6) von Anthropic, eingebunden als VS Code Extension
- **Zweck & Umfang**: KI wurde in folgenden Bereichen eingesetzt:
  - **Datenbankarchitektur:** Beratung zur Datenbankstruktur (Collections, Schema-Design, Entscheid zwischen eingebetteten Daten vs. Referenzen, `categoryId` als Slug-String statt ObjectId)
  - **Übungsdaten:** Erstellung von JSON-Importdateien für alle 65 Übungen in 7 Kategorien (Athletic, Isometrics, Kettlebell, Kraft, Mobility, Plyometrics, Rotation) inkl. `bodyParts`-Zuordnung
  - **Descriptions & Instructions:** Generierung von anfängergerechten Beschreibungen und nummerierten Schritt-für-Schritt-Anleitungen für alle 65 Übungen via Python-Hilfsskript (`scripts/add_descriptions.py`)
  - **Kategoriedaten:** Erstellung der `categories.json` mit Farben, Icons und Slugs für alle 7 Kategorien
  - **Code:** Umsetzung aller SvelteKit-Routen und Serverlogik (`+page.server.js`, `db.js`, `planHelper.js`) sowie aller Svelte-Komponenten (`+page.svelte`) für sämtliche Seiten der App: Homepage, Exercises-Liste, Übungsdetailseite, Categories-Übersicht, Kategorie-Detailseite, Your Plan (Draft + Active + Completed), Plan-Detailseite, Add-Exercise-Formular
  - **Plan-Feature:** Vollständige Implementierung des Plan-Workflows (Draft → Active → Completed) inkl. `use:enhance`-Pattern für Live-Updates ohne Seitenreload, `$derived()`-Reaktivität in Svelte 5, MongoDB-Positionaloperator für Array-Updates (`exercises.$`) und `$pull` für Array-Elemente entfernen
  - **Debugging:** Behebung des MongoDB-Verbindungsfehlers (`MONGODB_URI` nicht gefunden), Svelte-5-spezifischer Warnungen (reaktive Props-Destrukturierung) sowie Fix fehlender Live-Updates bei Form-Actions (fehlende `use:enhance`-Callbacks)
  - **Dokumentation:** Verfassen der technischen Abschnitte der Projektdokumentation (3.4.1 Workflows/Testanleitung, 3.4.2 Technik, 6.x) sowie der `CLAUDE.md` Projektregeln
  - Teile des Codes und der Inhalte stammen aus KI-Unterstützung, wurden jedoch vom Entwickler geprüft, angepasst und in das Projekt integriert.
- **Eigene Leistung (Abgrenzung):**
  - Eigenständige Konzeption und Definition aller Projektanforderungen (Ausgangslage, Ziele, Zielgruppen)
  - Eigenständige Gestaltung aller Mockups und Prototypen in Figma
  - Entscheide zur Technologiewahl (SvelteKit, MongoDB, Bootstrap)
  - Zusammenstellung aller 65 Übungen inkl. Kategorie- und Muskelgruppen-Zuordnung (als `.md`-Datei vorbereitet, von KI in JSON konvertiert)
  - Aufbau der MongoDB-Datenbank (Atlas) und manueller Import aller Daten via Compass
  - Überprüfung, Anpassung und Validierung aller KI-generierten Vorschläge
  - Projektstruktur und Navigation wurden eigenständig konzipiert

### 6.2 Prompt-Vorgehen
Die Prompts wurden stets mit konkretem Kontext versehen: Screenshots des Mockups, Ausschnitte aus der Projektdokumentation und spezifische technische Rahmenbedingungen (SvelteKit 5, MongoDB, Bootstrap) wurden jeweils mitgegeben. Statt pauschale Fragen zu stellen («Erstelle mir eine App»), wurden gezielte Teilaufgaben formuliert (z. B. «Erstelle die Homepage-Grundstruktur mit Bootstrap-Elementen gemäss dem angehängten Prototyp, inklusive Interaktivität laut Workflow-Definition in Abschnitt 3.4»). Generierte Vorschläge wurden immer kritisch geprüft, bevor sie übernommen wurden — unpassende Lösungen (z. B. zu komplexe Seed-Skripte statt manuellem Dateneintrag) wurden abgelehnt und das Vorgehen angepasst.

### 6.3 Reflexion

- **Nutzen:** Claude Code war hilfreich für repetitive Boilerplate-Aufgaben (Server-Routen, Serialisierung, JSON-Schemas) und als Sparringspartner bei Architekturentscheiden (z. B. String-IDs vs. ObjectIds, separate Categories-Collection vs. eingebettetes Feld).
- **Grenzen:** Die KI kennt den spezifischen Projektkontext nicht aus sich heraus — ohne präzise Prompts mit Screenshots und Dokumentationsauszügen wären die Vorschläge zu generisch gewesen. Zudem mussten DB-Namen, Collection-Strukturen und UX-Entscheide stets manuell vorgegeben werden.
- **Risiken & Qualitätssicherung:** KI-generierter Code wurde nicht blind übernommen. Jeder Vorschlag wurde im IDE auf Korrektheit geprüft, nicht passende Vorschläge (z. B. automatische Seed-Skripte statt manuellem Import) wurden explizit abgelehnt. Die finale Verantwortung für Codequalität und Projektergebnis liegt beim Entwickler.

## 7. Anhang [Optional]
Beispiele:
- **Quellen:** _[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; ...]_
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_