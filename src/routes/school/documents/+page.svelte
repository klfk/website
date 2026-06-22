<script lang="ts">
  import { enhance } from '$app/forms';
  import DocumentItem from '$lib/components/school/DocumentItem.svelte';

  let { data, form } = $props();

  /**
   * Document list.
   * - Set available: true once the real file is in static/school/documents/.
   * - Set available: false to show a greyed-out "in Vorbereitung" button.
   * - fileSize is displayed as-is; update it if you replace a file.
   */
  const docs = [
    {
      filename:    'Bewerbungsschreiben_Ivan_Matiash.pdf',
      description: 'Bewerbungsschreiben an Sympany',
      fileSize:    '55 KB',
      available:   true,
      path:        '/school/documents/Bewerbungsschreiben_Ivan_Matiash.pdf',
    },
    {
      filename:    'Lebenslauf_Ivan_Matiash.pdf',
      description: 'Tabellarischer Lebenslauf',
      fileSize:    '335 KB',
      available:   true,
      path:        '/school/documents/Lebenslauf_Ivan_Matiash.pdf',
    },
    {
      filename:    'Schulbestaetigung_IMS_Ivan_Matiash.pdf',
      description: 'Schulbestätigung IMS Basel (2025/26, Semester 2)',
      fileSize:    '59 KB',
      available:   true,
      path:        '/school/documents/Schulbestaetigung_IMS_Ivan_Matiash.pdf',
    },
    {
      filename:    'Modulnotenuebersicht_IMS_Ivan_Matiash.pdf',
      description: 'Notenübersicht der IMS-Module',
      fileSize:    '65 KB',
      available:   true,
      path:        '/school/documents/Modulnotenuebersicht_IMS_Ivan_Matiash.pdf',
    },
    {
      filename:    'Zeugnis_IMS_Semester1.pdf',
      description: 'IMS Semesterzeugnis 1 (2024/25)',
      fileSize:    '73 KB',
      available:   true,
      path:        '/school/documents/Zeugnis_IMS_Semester1.pdf',
    },
    {
      filename:    'Zeugnis_IMS_Semester2.pdf',
      description: 'IMS Semesterzeugnis 2 (2024/25)',
      fileSize:    '~73 KB',
      available:   false,   // [TODO: Ivan — upload when available]
      path:        '/school/documents/Zeugnis_IMS_Semester2.pdf',
    },
    {
      filename:    'Zeugnis_IMS_Semester3.pdf',
      description: 'IMS Semesterzeugnis 3 (2025/26)',
      fileSize:    '73 KB',
      available:   true,
      path:        '/school/documents/Zeugnis_IMS_Semester3.pdf',
    },
    {
      filename:    'Goethe_B1_Zertifikat.pdf',
      description: 'Goethe-Zertifikat Deutsch B1 (2023)',
      fileSize:    '~200 KB',
      available:   false,   // [TODO: Ivan — upload scan of the certificate]
      path:        '/school/documents/Goethe_B1_Zertifikat.pdf',
    },
  ];
</script>

<svelte:head>
  <title>Dokumente — Ivan Matiash</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content="Bewerbungsunterlagen von Ivan Matiash (geschützter Bereich)." />
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
      <h1>Geschützter Bereich</h1>
      <p class="gate-desc">
        Dieses Dokument ist nur für autorisierte Personen zugänglich.
        Bitte PIN eingeben, um fortzufahren.
      </p>

      <form method="POST" action="?/login" use:enhance class="pin-form">
        <label for="pin" class="sr-only">PIN</label>
        <!-- svelte-ignore a11y_autofocus -->
        <input
          id="pin"
          name="pin"
          type="password"
          inputmode="numeric"
          autocomplete="current-password"
          placeholder="PIN eingeben"
          class="pin-input"
          class:error={!!form?.error}
          autofocus
          required
        />
        {#if form?.error}
          <p class="error-msg" role="alert">{form.error}</p>
        {/if}
        <button type="submit" class="pin-btn">Bestätigen</button>
      </form>
    </div>
  </div>

{:else}
  <!-- ── Document list (authenticated) ──────────────────────────── -->
  <header class="page-head">
    <div class="head-row">
      <h1>Dokumente</h1>
      <form method="POST" action="?/logout" use:enhance>
        <button type="submit" class="logout-btn" aria-label="Abmelden">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M9 10l3-3-3-3M12 7H5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Abmelden
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
    Dieser Bereich enthält meine persönlichen Bewerbungsunterlagen.
    Bitte behandeln Sie die Dokumente vertraulich.
  </div>

  <ul class="doc-list" aria-label="Bewerbungsunterlagen">
    {#each docs as doc}
      <DocumentItem
        filename={doc.filename}
        description={doc.description}
        fileSize={doc.fileSize}
        available={doc.available}
        path={doc.path}
      />
    {/each}
  </ul>
{/if}

<style>
  /* ── Login gate ──────────────────────────────────────────────────── */
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

  .gate-icon {
    color: var(--s-muted);
    margin-bottom: 0.25rem;
  }

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

  .pin-input:focus {
    border-color: var(--s-text);
  }

  .pin-input.error {
    border-color: #e05252;
  }

  .error-msg {
    font-size: 0.8rem;
    color: #e05252;
    margin: 0;
    text-align: center;
  }

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

  .pin-btn:hover {
    opacity: 0.82;
  }

  /* Screen-reader-only utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* ── Authenticated view ──────────────────────────────────────────── */
  .page-head {
    margin-bottom: 1.5rem;
  }

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

  .logout-btn:hover {
    color: var(--s-text);
    border-color: var(--s-muted);
  }

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

  .notice svg {
    flex-shrink: 0;
  }

  .doc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
</style>
