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
  - Übungen sind filterbar nach Muskelgruppe und Trainingskategorie (Athletic, Mobility, Plyometrics, Isometrics, Kraft, Kettlebell, Rotation, Explosiveness)
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
  Ergänzend verfügt jede Trainingskategorie (Athletic, Mobility, Plyometrics, Isometrics, Kraft, Kettlebell, Rotation, Explosiveness) über eine eigene Detailseite, auf der alle Übungen dieser Kategorie aufgelistet und beschrieben sind.
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
  - Die Menge an Trainingsmethoden und -philosophien (Kraft, Mobility, Plyometrics, Isometrics, Kettlebell, Rotation, Explosiveness) führt zu Entscheidungsmüdigkeit – besonders wenn mehrere Stile kombiniert werden sollen.
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
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die technische Umsetzung]_
- **User Interface Design:** _[wichtige Screens: Screenshots mit kurzen Erläuterungen]_  
- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_

#### 3.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie-Stack:** _[SvelteKit, Bibliotheken falls genutzt]_
- **Tooling:** _[IDE/Erweiterungen, lokale/Cloud-Tools; den Einsatz von KI beschreiben Sie im Kapitel **KI-Deklaration**]_  
- **Struktur & Komponenten:** _[Seiten, Routen, State/Stores, wichtige Komponenten]_
- **Daten & Schnittstellen:** _[Wie werden Daten gespeichert, verwaltet, abgerufen?]_
- **Deployment:** _[URL]_  
- **Besondere Entscheidungen:** _[z. B. Trade-offs, Vereinfachungen]_  

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
- **Eingesetzte Tools**: _[z. B. Copilot, ChatGPT, Claude, lokale Modelle; Version/Variante wenn bekannt]_
- **Zweck & Umfang**: _[wie, wofür und in welchem Ausmass wurde KI eingesetzt (z. B. Textentwürfe, Codevorschläge, Tests, Refactoring); welche Teile stammen (ganz/teilweise) aus KI-Unterstützung?]_
- **Eigene Leistung (Abgrenzung):** _[was ist eigenständig erarbeitet/überarbeitet worden?]_

### 6.2 Prompt-Vorgehen
_[Überlegungen zu Prompt-Vorgehen, Qualität und Urheberrecht/Quellen. Wie wurde beim Prompting vorgegangen? Zu beschreiben ist die grundlegende Vorgehensweise. Einzelne, konkrete Prompts sollten höchstens als Beispiele aufgeführt werden. ]_

### 6.3 Reflexion
_[Nutzen, Grenzen, Risiken/Qualitätssicherung, ...]_

## 7. Anhang [Optional]
Beispiele:
- **Quellen:** _[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; ...]_
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_