<svelte:head>
  <title>Über mich — Ivan Matiash</title>
  <meta
    name="description"
    content="Vollständiger Lebenslauf von Ivan Matiash: Schulbildung, Berufserfahrung, Sprachkenntnisse und Informatikkenntnisse."
  />
  <meta property="og:title" content="Lebenslauf — Ivan Matiash" />
  <meta property="og:type"  content="website" />
</svelte:head>

<div class="cv">
  <!-- ── Heading ─────────────────────────────────────────────────── -->
  <header class="cv-head">
    <h1>Lebenslauf</h1>
    <p class="cv-name">Ivan Matiash</p>
  </header>

  <!-- ── Personalien ─────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-personal">
    <h2 id="s-personal">Personalien</h2>
    <dl class="cv-dl">
      <div class="cv-row"><dt>Name</dt><dd>Ivan Matiash</dd></div>
      <div class="cv-row">
        <dt>Adresse</dt>
        <dd>Jurastrasse 52, 4053 Basel</dd>
      </div>
      <div class="cv-row">
        <dt>Telefon</dt>
        <dd><a href="tel:+41765489556">+41 76 548 95 56</a></dd>
      </div>
      <div class="cv-row">
        <dt>E-Mail</dt>
        <dd><a href="mailto:ivan.matjash@gmail.com">ivan.matjash@gmail.com</a></dd>
      </div>
      <div class="cv-row">
        <dt>Geburtsdatum</dt>
        <dd>12. Dezember 2008</dd>
      </div>
      <div class="cv-row">
        <dt>Nationalität</dt>
        <dd>Ukraine (Ausweis S)</dd>
      </div>
      <div class="cv-row">
        <dt>GitHub</dt>
        <dd>
          <a href="https://github.com/klfk" target="_blank" rel="noopener noreferrer">
            github.com/klfk
          </a>
        </dd>
      </div>
    </dl>
  </section>

  <!-- ── Schulbildung ────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-edu">
    <h2 id="s-edu">Schulbildung</h2>
    <ul class="cv-timeline">
      <li class="cv-entry">
        <div class="cv-period">2024 – heute</div>
        <div class="cv-detail">
          <strong>Informatikmittelschule Basel (IMS)</strong><br />
          Klasse I-2a · Fachrichtung Applikationsentwicklung<br />
          Berufsmaturität integriert
        </div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">bis 2024</div>
        <div class="cv-detail">
          <strong>Sekundarschule De Wette</strong>, Basel<br />
          Niveau P
        </div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">bis 2022</div>
        <div class="cv-detail">
          <strong>Primarschule Nr. 206</strong>, Kiew, Ukraine
        </div>
      </li>
    </ul>
  </section>

  <!-- ── Berufserfahrung ─────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-work">
    <h2 id="s-work">Berufserfahrung</h2>
    <ul class="cv-timeline">
      <li class="cv-entry">
        <div class="cv-period">Sommer 2025</div>
        <div class="cv-detail">
          <strong>Ferienjob auf einem Bauernhof</strong>, Kanton St. Gallen<br />
          Alpwirtschaft, Mithilfe bei Tieren und allgemeiner Hofarbeit
        </div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">2024</div>
        <div class="cv-detail">
          <strong>Schnupperlehre bei Adobe Systems Schweiz</strong>, Basel — eine Woche<br />
          Einblicke in Frontend-Entwicklung, Python und Design
        </div>
      </li>
    </ul>
  </section>

  <!-- ── Sprachkenntnisse ────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-lang">
    <h2 id="s-lang">Sprachkenntnisse</h2>
    <ul class="cv-timeline">
      <li class="cv-entry">
        <div class="cv-period">Ukrainisch</div>
        <div class="cv-detail">Muttersprache</div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">Russisch</div>
        <div class="cv-detail">Muttersprache</div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">Englisch</div>
        <div class="cv-detail">ca. C1 — fliessend in Wort und Schrift</div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">Deutsch</div>
        <div class="cv-detail">B1 — Goethe-Zertifikat (2023)</div>
      </li>
      <li class="cv-entry">
        <div class="cv-period">Französisch</div>
        <div class="cv-detail">B2 — laufender Unterricht in der IMS</div>
      </li>
    </ul>
  </section>

  <!-- ── Informatikkenntnisse ────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-it">
    <h2 id="s-it">Informatikkenntnisse</h2>
    <p class="cv-note">
      Details auf der Seite <a href="/school/skills">Kenntnisse</a>.
    </p>
    <ul class="cv-bullets">
      <li><strong>Solide:</strong> Python, JavaScript, HTML/CSS, PHP, Java (OOP)</li>
      <li><strong>In Vertiefung:</strong> C, Rust</li>
      <li><strong>Datenbanken:</strong> MySQL, NoSQL, SQL</li>
      <li><strong>Tools:</strong> Git, Docker, Neovim, VS Code, Svelte, Typst</li>
    </ul>
  </section>

  <!-- ── Projekte ────────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-proj">
    <h2 id="s-proj">Projekte</h2>
    <p class="cv-note">
      Details auf der Seite <a href="/school/projects">Projekte</a>.
    </p>
    <ul class="cv-bullets">
      <li>
        <strong>Librebooks</strong> —
        CRUD-Applikation für eine Bibliothek (Schulprojekt)
      </li>
      <li>
        <strong>ivanm.xyz</strong> —
        Persönliche Webseite mit Svelte und Cloudflare
      </li>
      <li>
        <strong>Typing-Tester (Terminal)</strong> —
        Eigenes Tool zur Messung der Tippgeschwindigkeit
      </li>
      <li>
        <strong>Dotfiles &amp; Neovim-Skripte</strong> —
        Persönliche Editor-Konfiguration auf GitHub
      </li>
    </ul>
  </section>

  <!-- ── Freizeit ────────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-leisure">
    <h2 id="s-leisure">Freizeit</h2>
    <ul class="cv-bullets">
      <li>Schlagzeug in mehreren Bands, regelmässige Auftritte</li>
      <li>Krafttraining</li>
      <li>Lesen, Arthouse-Kino</li>
      <li>Eigene Coding-Projekte</li>
    </ul>
  </section>

  <!-- ── Referenzen ──────────────────────────────────────────────── -->
  <section class="cv-section" aria-labelledby="s-ref">
    <h2 id="s-ref">Referenzen</h2>
    <p class="cv-single">Auf Anfrage gerne.</p>
  </section>
</div>

<style>
  .cv {
    max-width: 700px;
  }

  /* ── Header ──────────────────────────────────────────────────────── */
  .cv-head {
    margin-bottom: 2.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 2px solid var(--s-border);
  }

  .cv-head h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.03em;
    margin: 0 0 0.2rem;
    color: var(--s-text);
  }

  .cv-name {
    color: var(--s-muted);
    font-size: 0.875rem;
    margin: 0;
    letter-spacing: 0.04em;
  }

  /* ── Section shell ────────────────────────────────────────────────  */
  .cv-section {
    margin-bottom: 2.25rem;
  }

  .cv-section h2 {
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--s-muted);
    margin: 0 0 0.9rem;
    font-family: monospace;
    padding-bottom: 0.45rem;
    border-bottom: 1px solid var(--s-border);
  }

  /* ── Definition list (Personalien) ────────────────────────────────  */
  .cv-dl {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .cv-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0.5rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid var(--s-border);
    font-size: 0.875rem;
  }

  .cv-row:last-child {
    border-bottom: none;
  }

  .cv-row dt {
    color: var(--s-muted);
    font-weight: 500;
  }

  .cv-row dd {
    margin: 0;
    color: var(--s-text);
  }

  .cv-row dd a {
    color: var(--s-link);
    text-decoration: none;
  }

  .cv-row dd a:hover {
    color: var(--s-link-hover);
    text-decoration: underline;
  }

  /* ── Timeline (Schulbildung, Beruf, Sprachen) ─────────────────────  */
  .cv-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .cv-entry {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0.75rem;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--s-border);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .cv-entry:last-child {
    border-bottom: none;
  }

  .cv-period {
    color: var(--s-muted);
    font-size: 0.8rem;
    font-family: monospace;
    font-weight: 500;
    padding-top: 0.1rem;
    white-space: nowrap;
  }

  .cv-detail {
    color: var(--s-text);
  }

  .cv-detail strong {
    font-weight: 600;
    color: var(--s-text);
  }

  /* ── Bullet lists (IT, Projekte, Freizeit) ────────────────────────  */
  .cv-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
  }

  .cv-bullets li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--s-border);
    line-height: 1.55;
    padding-left: 0.9rem;
    position: relative;
  }

  .cv-bullets li::before {
    content: '–';
    position: absolute;
    left: 0;
    color: var(--s-muted);
  }

  .cv-bullets li:last-child {
    border-bottom: none;
  }

  .cv-bullets strong {
    font-weight: 600;
  }

  /* ── Misc text ────────────────────────────────────────────────────  */
  .cv-note {
    font-size: 0.8rem;
    color: var(--s-muted);
    margin: 0 0 0.65rem;
  }

  .cv-note a {
    color: var(--s-link);
    text-decoration: none;
  }

  .cv-note a:hover {
    text-decoration: underline;
  }

  .cv-single {
    font-size: 0.875rem;
    color: var(--s-text);
    margin: 0;
    opacity: 0.75;
  }

  /* ── Responsive ───────────────────────────────────────────────────  */
  @media (max-width: 480px) {
    .cv-row,
    .cv-entry {
      grid-template-columns: 100px 1fr;
      gap: 0.5rem;
    }

    .cv-period {
      font-size: 0.72rem;
    }
  }
</style>
