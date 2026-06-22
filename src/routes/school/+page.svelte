<script lang="ts">
  // ── Company config ────────────────────────────────────────────────
  // To swap the target company everywhere, change only this object.
  const company = { name: 'Sympany', location: 'Basel' };

  // ── Contact form state ────────────────────────────────────────────
  let name    = $state('');
  let email   = $state('');
  let message = $state('');
  let honey   = $state(''); // honeypot — must stay empty; bots fill it
  let sent    = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (honey) return; // silently ignore bot submissions
    const sub  = encodeURIComponent(`Anfrage via ivanm.xyz/school`);
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\n\n${message}`
    );
    window.location.href =
      `mailto:[privat]?subject=${sub}&body=${body}`;
    sent = true;
  }
</script>

<svelte:head>
  <title>Ivan Matiash — Bewerbungsprofil</title>
  <meta
    name="description"
    content="Online-Bewerbungsprofil von Ivan Matiash, IMS Basel, 2. Lehrjahr — Praktikum bei {company.name} gesucht."
  />
  <meta property="og:title"       content="Ivan Matiash — Bewerbungsprofil" />
  <meta property="og:description" content="IMS Basel · 2. Lehrjahr · Praktikum gesucht · ivanm.xyz/school" />
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="https://ivanm.xyz/school" />
</svelte:head>

<!-- ── Hero ──────────────────────────────────────────────────────── -->
<section class="hero" aria-labelledby="hero-name">
  <div class="avatar">
    <img src="/school/portrait.png" alt="Ivan Matiash" />
  </div>
  <div class="hero-text">
    <h1 id="hero-name">Ivan Matiash</h1>
    <p class="subtitle">IMS Basel · 2. Lehrjahr · Praktikum gesucht</p>
  </div>
</section>

<!-- ── Kurzprofil ────────────────────────────────────────────────── -->
<section class="kurzprofil" aria-labelledby="kp-heading">
  <h2 id="kp-heading" class="section-label">Kurzprofil</h2>
  <p>
    Ich bin Ivan Matiash, 17, im zweiten Lehrjahr der Informatikmittelschule
    Basel. In der Schule arbeite ich mit Java, PHP, JavaScript und Datenbanken,
    privat baue ich an meiner Webseite, an Neovim-Konfigurationen und kleinen
    Tools im Terminal. Für mein IMS-Praktikum suche ich eine Stelle, an der ich
    an echten Webapplikationen mitarbeiten und meine Kenntnisse in der Praxis
    vertiefen kann.
  </p>
</section>

<!-- ── Quick links ───────────────────────────────────────────────── -->
<nav class="quicklinks" aria-label="Schnellzugriff">
  <a href="/school/documents" class="ql-btn ql-primary">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="8" height="12" rx="1" stroke="currentColor" stroke-width="1.5" />
      <path d="M4 5h5M4 7.5h5M4 10h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
    </svg>
    Bewerbung als PDF
  </a>
  <a
    href="https://github.com/klfk"
    target="_blank"
    rel="noopener noreferrer"
    class="ql-btn"
  >
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
           0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
           -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
           .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
           -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
           1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
           1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
           1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
    GitHub
  </a>
  <a href="mailto:[privat]" class="ql-btn">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.5" />
      <path d="M1 4.5l6 4 6-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </svg>
    E-Mail
  </a>
</nav>

<!-- ── Contact form (bonus) ───────────────────────────────────────── -->
<section class="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading" class="section-label">Kontakt</h2>

  {#if sent}
    <p class="form-sent">
      Ihr E-Mail-Client wird geöffnet. Danke für Ihre Nachricht.
    </p>
  {:else}
    <form onsubmit={handleSubmit} class="form" novalidate>
      <!-- Honeypot: hidden from real users, left empty on valid submissions -->
      <div class="honeypot" aria-hidden="true">
        <label for="hp">Dieses Feld bitte leer lassen</label>
        <input id="hp" type="text" name="website" tabindex="-1" autocomplete="off" bind:value={honey} />
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="c-name">Name</label>
          <input
            id="c-name"
            type="text"
            name="name"
            required
            autocomplete="name"
            placeholder="Ihr Name"
            bind:value={name}
          />
        </div>
        <div class="form-field">
          <label for="c-email">E-Mail</label>
          <input
            id="c-email"
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="ihre@email.ch"
            bind:value={email}
          />
        </div>
      </div>

      <div class="form-field">
        <label for="c-msg">Nachricht</label>
        <textarea
          id="c-msg"
          name="message"
          required
          rows="4"
          placeholder="Ihre Nachricht…"
          bind:value={message}
        ></textarea>
      </div>

      <button type="submit" class="form-btn">Nachricht senden</button>
    </form>
  {/if}
</section>

<style>
  /* ── Hero ────────────────────────────────────────────────────────── */
  .hero {
    display: flex;
    align-items: center;
    gap: 1.75rem;
    margin-bottom: 2.5rem;
  }

  .avatar {
    width: 70px;
    height: 90px;
    flex-shrink: 0;
    border: 1px solid var(--s-border);
    border-radius: 4px;
    background: var(--s-surface-alt);
    overflow: hidden;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  h1 {
    font-family: 'VT323', monospace;
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0 0 0.4rem;
    line-height: 1.1;
    color: var(--s-text);
  }

  .subtitle {
    color: var(--s-muted);
    font-size: 0.875rem;
    margin: 0;
    letter-spacing: 0.025em;
  }

  /* ── Section labels ──────────────────────────────────────────────── */
  .section-label {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--s-muted);
    margin: 0 0 0.75rem;
    font-family: monospace;
  }

  /* ── Kurzprofil ──────────────────────────────────────────────────── */
  .kurzprofil {
    max-width: 660px;
    margin-bottom: 1.75rem;
    padding: 1.35rem 1.5rem;
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 6px;
    font-size: 0.925rem;
    line-height: 1.75;
  }

  .kurzprofil p {
    margin: 0;
  }

  /* ── Quick links ─────────────────────────────────────────────────── */
  .quicklinks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 3rem;
  }

  .ql-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.48rem 1rem;
    border: 1px solid var(--s-btn-border);
    background: var(--s-btn-bg);
    color: var(--s-btn-text);
    border-radius: 5px;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.15s, border-color 0.15s;
    cursor: pointer;
  }

  .ql-btn:hover {
    background: var(--s-surface-alt);
    border-color: var(--s-text);
    color: var(--s-text);
  }

  /* ── Contact form ────────────────────────────────────────────────── */
  .contact {
    max-width: 560px;
    padding-top: 1rem;
    border-top: 1px solid var(--s-border);
  }

  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .form-field label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--s-muted);
    font-family: monospace;
  }

  .form-field input,
  .form-field textarea {
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    color: var(--s-text);
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
    resize: vertical;
    width: 100%;
    box-sizing: border-box;
  }

  .form-field input:focus,
  .form-field textarea:focus {
    border-color: var(--s-text);
  }

  .form-field input::placeholder,
  .form-field textarea::placeholder {
    color: var(--s-muted);
    opacity: 0.55;
  }

  .form-field textarea {
    min-height: 100px;
  }

  .form-btn {
    padding: 0.52rem 1.2rem;
    background: var(--s-text);
    color: var(--s-bg);
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .form-btn:hover {
    opacity: 0.82;
  }

  .form-sent {
    font-size: 0.875rem;
    color: var(--s-muted);
    padding: 0.75rem 1rem;
    border: 1px solid var(--s-border);
    border-radius: 4px;
    background: var(--s-surface);
    margin: 0;
  }

  @media (max-width: 480px) {
    .hero {
      flex-direction: column;
      align-items: flex-start;
    }

    h1 {
      font-size: 1.9rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
