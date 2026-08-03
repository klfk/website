<script lang="ts">
  import { getContext } from 'svelte';
  import { translations, type Lang } from '$lib/i18n';

  const langCtx = getContext<{ current: Lang }>('lang');
  const t = $derived(translations[langCtx.current].home);

  const company = { name: 'Sympany', location: 'Basel' };

  let name    = $state('');
  let email   = $state('');
  let message = $state('');
  let honey   = $state('');
  let sent    = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (honey) return;
    const sub  = encodeURIComponent(`Anfrage via ivanm.xyz/school`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
    window.location.href = `mailto:[privat]?subject=${sub}&body=${body}`;
    sent = true;
  }
</script>

<svelte:head>
  <title>{t.meta_title}</title>
  <meta name="description" content={t.meta_desc.replace('{company}', company.name)} />
  <meta property="og:title"       content={t.meta_title} />
  <meta property="og:description" content={t.og_desc} />
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
    <p class="subtitle">{t.subtitle}</p>
  </div>
</section>

<!-- ── Kurzprofil ────────────────────────────────────────────────── -->
<section class="kurzprofil" aria-labelledby="kp-heading">
  <h2 id="kp-heading" class="section-label">{t.profile_heading}</h2>
  <p>{t.profile_text}</p>
</section>

<!-- ── Quick links ───────────────────────────────────────────────── -->
<nav class="quicklinks" aria-label="Schnellzugriff">
  <a href="/school/documents" class="ql-btn ql-primary">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="8" height="12" rx="1" stroke="currentColor" stroke-width="1.5" />
      <path d="M4 5h5M4 7.5h5M4 10h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
    </svg>
    {t.ql_docs}
  </a>
  <a href="/school/about" class="ql-btn">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M1.5 13c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    {t.ql_about}
  </a>
  <a href="mailto:[privat]" class="ql-btn">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.5" />
      <path d="M1 4.5l6 4 6-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </svg>
    {t.ql_email}
  </a>
</nav>

<!-- ── Contact form ───────────────────────────────────────────────── -->
<section class="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading" class="section-label">{t.contact_heading}</h2>

  {#if sent}
    <p class="form-sent">{t.form_sent}</p>
  {:else}
    <form onsubmit={handleSubmit} class="form" novalidate>
      <div class="honeypot" aria-hidden="true">
        <label for="hp">{t.honeypot_label}</label>
        <input id="hp" type="text" name="website" tabindex="-1" autocomplete="off" bind:value={honey} />
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="c-name">{t.field_name}</label>
          <input id="c-name" type="text" name="name" required autocomplete="name" placeholder={t.ph_name} bind:value={name} />
        </div>
        <div class="form-field">
          <label for="c-email">{t.field_email}</label>
          <input id="c-email" type="email" name="email" required autocomplete="email" placeholder={t.ph_email} bind:value={email} />
        </div>
      </div>

      <div class="form-field">
        <label for="c-msg">{t.field_message}</label>
        <textarea id="c-msg" name="message" required rows="4" placeholder={t.ph_message} bind:value={message}></textarea>
      </div>

      <button type="submit" class="form-btn">{t.send}</button>
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
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--s-border);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .hero-text h1 {
    font-family: 'VT323', monospace;
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0 0 0.2rem;
    color: var(--s-text);
  }

  .subtitle {
    color: var(--s-muted);
    font-size: 0.875rem;
    margin: 0;
  }

  /* ── Sections ────────────────────────────────────────────────────── */
  .section-label {
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--s-muted);
    margin: 0 0 0.65rem;
    font-family: monospace;
  }

  .kurzprofil {
    margin-bottom: 2rem;
    max-width: 680px;
  }

  .kurzprofil p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.75;
  }

  /* ── Quick links ─────────────────────────────────────────────────── */
  .quicklinks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .ql-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.42rem 0.9rem;
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
    margin: 0;
  }

  @media (max-width: 500px) {
    .hero {
      gap: 1.25rem;
    }
    .avatar {
      width: 62px;
      height: 62px;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
