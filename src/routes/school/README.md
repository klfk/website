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

## Cloudflare Access — Schutz für `/school/documents`

Der Schutz läuft vollständig auf Cloudflare-Ebene, **bevor** SvelteKit die
Anfrage sieht. Der SvelteKit-Code in `documents/+page.svelte` braucht keine
eigene Authentifizierungslogik.

### Schritt-für-Schritt (Cloudflare Dashboard)

1. **Zero Trust öffnen**  
   dashboard.cloudflare.com → Konto wählen → **Zero Trust** → **Access** →
   **Applications**

2. **Neue Application anlegen**  
   - Typ: **Self-hosted**  
   - Name: `ivanm.xyz – Dokumente`  
   - Application Domain: `ivanm.xyz`  
   - Path: `school/documents`  
   - Session Duration: z. B. `24 hours`

3. **Policy hinzufügen**  
   Empfohlene Variante für Bewerbungsgespräche:

   **Option A — One-Time PIN (einfachste Variante)**  
   - Policy name: `OTP Login`  
   - Action: `Allow`  
   - Rule: **Emails** → `ivan.matjash@gmail.com` (und weitere, falls gewünscht)  
   - Login method: **One-time PIN** (Cloudflare schickt einen 6-stelligen Code
     an die eingetragene E-Mail-Adresse)

   **Option B — spezifische E-Mail-Allowlist**  
   - Gleicher Aufbau, aber mehrere E-Mail-Adressen eintragen (z. B. die
     HR-Person bei Sympany)

4. **App-Launcher deaktivieren** (optional, sauberer)  
   → Appearance → App Launcher visibility: **Off**

5. **Testen**  
   Im Inkognito-Fenster `https://ivanm.xyz/school/documents` aufrufen.
   Cloudflare zeigt einen Login-Screen. Nach erfolgreicher PIN-Eingabe
   landet man auf der Dokumenten-Seite.

> **Hinweis zu `wrangler.toml`:** Cloudflare Pages-Projekte konfigurieren
> Access normalerweise im Dashboard, nicht über `wrangler.toml`. Wenn du
> Pages Functions einsetzt, kannst du den Schutz alternativ über einen
> `_routes.json`-Eintrag mit dem Cloudflare-Access-Worker ausdrücken — das
> ist aber für diesen Use-Case nicht nötig.

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
