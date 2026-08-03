<script lang="ts">
  import { getContext } from 'svelte';
  import { enhance } from '$app/forms';
  import { translations, type Lang } from '$lib/i18n';
  import DocumentItem from '$lib/components/school/DocumentItem.svelte';

  let { data, form } = $props();

  const langCtx = getContext<{ current: Lang }>('lang');
  const t = $derived(translations[langCtx.current].documents);
  const tRoot = $derived(translations[langCtx.current]);

  const docMeta = [
    { filename: 'Bewerbungsschreiben_Ivan_Matiash.pdf', fileSize: '55 KB',   available: true,  path: '/school/documents/Bewerbungsschreiben_Ivan_Matiash.pdf' },
    { filename: 'Lebenslauf_Ivan_Matiash.pdf',          fileSize: '335 KB',  available: true,  path: '/school/documents/Lebenslauf_Ivan_Matiash.pdf' },
    { filename: 'Schulbestaetigung_IMS_Ivan_Matiash.pdf', fileSize: '59 KB', available: true,  path: '/school/documents/Schulbestaetigung_IMS_Ivan_Matiash.pdf' },
    { filename: 'Modulnotenuebersicht_IMS_Ivan_Matiash.pdf', fileSize: '65 KB', available: true, path: '/school/documents/Modulnotenuebersicht_IMS_Ivan_Matiash.pdf' },
    { filename: 'Zeugnis_IMS_Semester1.pdf',            fileSize: '73 KB',   available: true,  path: '/school/documents/Zeugnis_IMS_Semester1.pdf' },
    { filename: 'Zeugnis_IMS_Semester2.pdf',            fileSize: '~73 KB',  available: false, path: '/school/documents/Zeugnis_IMS_Semester2.pdf' },
    { filename: 'Zeugnis_IMS_Semester3.pdf',            fileSize: '73 KB',   available: true,  path: '/school/documents/Zeugnis_IMS_Semester3.pdf' },
    { filename: 'Goethe_B1_Zertifikat.pdf',             fileSize: '~200 KB', available: false, path: '/school/documents/Goethe_B1_Zertifikat.pdf' },
  ];
</script>

<svelte:head>
  <title>{t.meta_title}</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content={t.meta_desc} />
</svelte:head>

{#if !data.authenticated}
  <!-- ── Login gate ──────────────────────────────────────────────── -->
  <div class="gate-wrap">
    <div class="gate">
      <div class="gate-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="4" y="10" width="14" height="11" rx="2" stroke="currentColor" stroke-width="1.6"/>
          <path d="M7 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </div>
      <h1>{t.gate_heading}</h1>
      <p class="gate-desc">{t.gate_desc}</p>

      <form method="POST" action="?/login" use:enhance class="pin-form">
        <label for="pin" class="sr-only">PIN</label>
        <!-- svelte-ignore a11y_autofocus -->
        <input
          id="pin"
          name="pin"
          type="password"
          inputmode="numeric"
          autocomplete="current-password"
          placeholder={t.pin_placeholder}
          class="pin-input"
          class:error={!!form?.error}
          autofocus
          required
        />
        {#if form?.error}
          <p class="error-msg" role="alert">{form.error}</p>
        {/if}
        <button type="submit" class="pin-btn">{t.confirm}</button>
      </form>
    </div>
  </div>

{:else}
  <!-- ── Document list (authenticated) ──────────────────────────── -->
  <header class="page-head">
    <div class="head-row">
      <h1>{t.heading}</h1>
      <form method="POST" action="?/logout" use:enhance>
        <button type="submit" class="logout-btn" aria-label={t.logout}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M9 10l3-3-3-3M12 7H5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {t.logout}
        </button>
      </form>
    </div>
  </header>

  <div class="notice" role="note">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.4"/>
      <line x1="7.5" y1="6.5" x2="7.5" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="7.5" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
    {t.notice}
  </div>

  <ul class="doc-list" aria-label={t.heading}>
    {#each docMeta as doc, i}
      <DocumentItem
        filename={doc.filename}
        description={t.docs[i].description}
        fileSize={doc.fileSize}
        available={doc.available}
        path={doc.path}
        lang={langCtx.current}
      />
    {/each}
  </ul>
{/if}

<style>
  .gate-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
  }

  .gate {
    width: min(360px, 100%);
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 8px;
    padding: 2rem 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-align: center;
  }

  .gate-icon { color: var(--s-muted); margin-bottom: 0.25rem; }

  .gate h1 {
    font-family: 'VT323', monospace;
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0;
    color: var(--s-text);
  }

  .gate-desc {
    font-size: 0.85rem;
    color: var(--s-muted);
    line-height: 1.55;
    margin: 0;
    max-width: 280px;
  }

  .pin-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .pin-input {
    width: 100%;
    box-sizing: border-box;
    background: var(--s-bg);
    border: 1px solid var(--s-border);
    color: var(--s-text);
    border-radius: 5px;
    padding: 0.6rem 0.85rem;
    font-size: 1rem;
    font-family: monospace;
    text-align: center;
    letter-spacing: 0.2em;
    outline: none;
    transition: border-color 0.15s;
  }

  .pin-input:focus { border-color: var(--s-text); }
  .pin-input.error { border-color: #e05252; }

  .error-msg { font-size: 0.8rem; color: #e05252; margin: 0; text-align: center; }

  .pin-btn {
    width: 100%;
    padding: 0.58rem;
    background: var(--s-text);
    color: var(--s-bg);
    border: none;
    border-radius: 5px;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.15s;
    margin-top: 0.25rem;
  }

  .pin-btn:hover { opacity: 0.82; }

  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .page-head { margin-bottom: 1.5rem; }

  .head-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0;
    color: var(--s-text);
  }

  .logout-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--s-muted);
    background: transparent;
    border: 1px solid var(--s-border);
    border-radius: 4px;
    padding: 0.3rem 0.7rem;
    cursor: pointer;
    font-family: inherit;
    transition: color 0.15s, border-color 0.15s;
  }

  .logout-btn:hover { color: var(--s-text); border-color: var(--s-muted); }

  .notice {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: var(--s-muted);
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 5px;
    padding: 0.75rem 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .notice svg { flex-shrink: 0; }

  .doc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
</style>
