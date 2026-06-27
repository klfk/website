# /school — Online-Bewerbungsprofil

Dieser Ordner enthält alle Routen und Ressourcen für das IDAF-Projekt
«Erfolgversprechende Bewerbung» (IMS Basel, 2026).

---

## Offene Platzhalter (vor der Abgabe ausfüllen)

| Datei / Stelle | Was fehlt |
|---|---|
| `+page.svelte` (Home), Avatar-Div | Echtes Portraitfoto einfügen (`<img src="/school/portrait.jpg" alt="Ivan Matiash" />`). Proportionen 35 × 45 mm. |
| `static/school/documents/*.pdf` | Alle 8 Platzhalter-PDFs durch die echten Dokumente ersetzen. |
| `documents/+page.svelte`, Zeile `available: false` | `Zeugnis_IMS_Semester3.pdf` und `Schnupperlehre_Bestaetigung.pdf` auf `true` setzen, sobald die Dateien hochgeladen sind. |

---

## Dokumente hinzufügen oder entfernen

1. PDF-Datei in `static/school/documents/` ablegen.
2. Eintrag in `src/routes/school/documents/+page.svelte` in der `docs`-Liste
   ergänzen oder entfernen:
   ```ts
   {
     filename:    'Dateiname.pdf',
     description: 'Kurzbeschreibung (eine Zeile)',
     fileSize:    '~120 KB',
     available:   true,
     path:        '/school/documents/Dateiname.pdf',
   },
   ```
3. `available: false` zeigt einen deaktivierten Button «in Vorbereitung»,
   solange die Datei noch nicht hochgeladen ist.

---

## Schutz für `/school/documents` — PIN-Login

Der Schutz läuft direkt in SvelteKit über eine einfache PIN-Abfrage.
Es ist **kein Cloudflare Zero Trust / Access** nötig — nur eine einzige
Umgebungsvariable in den Cloudflare Pages-Einstellungen.

### Einmaliges Setup (Cloudflare Pages Dashboard)

1. Cloudflare Dashboard öffnen → dein Pages-Projekt → **Settings** →
   **Environment variables** → **Add variable**
2. Name: `SCHOOL_DOCS_PASSWORD`  
   Value: einen PIN nach Wahl (z. B. `847291`)  
   Scope: **Production** (und optional Preview)
3. Speichern → nächsten Deploy abwarten (oder manuell triggern)

Fertig. Wer `/school/documents` öffnet, sieht eine PIN-Eingabe.
Nach korrekter Eingabe wird ein `httpOnly`-Cookie für 8 Stunden gesetzt.

### Lokal testen

```bash
# .env anlegen (nicht committen — steht im .gitignore)
echo 'SCHOOL_DOCS_PASSWORD=your_pin_here' > .env
npm run dev
```

### PIN ändern

In Cloudflare Pages → Settings → Environment variables → Wert anpassen →
neuen Deploy starten. Alle laufenden Sessions laufen nach 8 Stunden
automatisch ab.

---

## Firmenname im Kurzprofil tauschen

Das Kurzprofil auf der Home-Seite (`+page.svelte`) hat ein einzelnes
Konfigurationsobjekt ganz oben im `<script>`-Block:

```ts
const company = { name: 'Sympany', location: 'Basel' };
```

Den Wert von `name` ändern, speichern, fertig. Der Rest der Seite
referenziert (momentan) nur den `company.name` in den Meta-Tags.
Der Fliesstext des Kurzprofils ist absichtlich **neutral gehalten** und
nennt kein Unternehmen beim Namen — so muss er für andere Bewerbungen
nicht angepasst werden.

---

## Suche erweitern

Die Suche läuft clientseitig über einen statischen Index in
`src/lib/components/school/SchoolSearch.svelte`. Das Array `INDEX` am
Anfang des `<script>`-Blocks enthält alle durchsuchbaren Einträge.
Neuen Eintrag einfach als Objekt mit `{ type, title, desc, href }`
ergänzen.

---

## Lokale Entwicklung

```bash
npm run dev
# → http://localhost:5173/school
```

Alle fünf Routen:

| Route | Seite |
|---|---|
| `/school` | Home / Kurzprofil |
| `/school/about` | Über mich (Lebenslauf) |
| `/school/projects` | Projekte |
| `/school/skills` | Kenntnisse |
| `/school/documents` | Dokumente (lokal ungeschützt; Schutz nur auf Cloudflare aktiv) |
