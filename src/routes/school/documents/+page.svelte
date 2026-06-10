<script lang="ts">
  import DocumentItem from '$lib/components/school/DocumentItem.svelte';

  /**
   * Document list for the protected /school/documents route.
   *
   * To add or remove a document:
   *   - Drop the PDF into static/school/documents/
   *   - Add (or remove) an entry here
   *   - Set available: true once the file is actually uploaded
   *
   * The Cloudflare Access gate is configured outside the app (see README.md).
   * This page renders normally once the user is authenticated.
   */
  const docs = [
    {
      filename:    'Bewerbungsschreiben_Ivan_Matiash.pdf',
      description: 'Bewerbungsschreiben an Sympany',
      fileSize:    '~80 KB',
      available:   true,
      path:        '/school/documents/Bewerbungsschreiben_Ivan_Matiash.pdf',
    },
    {
      filename:    'Lebenslauf_Ivan_Matiash.pdf',
      description: 'Tabellarischer Lebenslauf',
      fileSize:    '~80 KB',
      available:   true,
      path:        '/school/documents/Lebenslauf_Ivan_Matiash.pdf',
    },
    {
      filename:    'Modulnotenuebersicht_IMS_Ivan_Matiash.pdf',
      description: 'Notenübersicht der IMS-Module',
      fileSize:    '~120 KB',
      available:   true,
      path:        '/school/documents/Modulnotenuebersicht_IMS_Ivan_Matiash.pdf',
    },
    {
      filename:    'Zeugnis_IMS_Semester1.pdf',
      description: 'IMS Semesterzeugnis 1',
      fileSize:    '~120 KB',
      available:   true,
      path:        '/school/documents/Zeugnis_IMS_Semester1.pdf',
    },
    {
      filename:    'Zeugnis_IMS_Semester2.pdf',
      description: 'IMS Semesterzeugnis 2',
      fileSize:    '~120 KB',
      available:   true,
      path:        '/school/documents/Zeugnis_IMS_Semester2.pdf',
    },
    {
      filename:    'Zeugnis_IMS_Semester3.pdf',
      description: 'IMS Semesterzeugnis 3',
      fileSize:    '~120 KB',
      available:   false, // [TODO: Ivan — upload once Semester 3 is done]
      path:        '/school/documents/Zeugnis_IMS_Semester3.pdf',
    },
    {
      filename:    'Goethe_B1_Zertifikat.pdf',
      description: 'Goethe-Zertifikat Deutsch B1 (2023)',
      fileSize:    '~200 KB',
      available:   true,
      path:        '/school/documents/Goethe_B1_Zertifikat.pdf',
    },
    {
      filename:    'Schnupperlehre_Bestaetigung.pdf',
      description: 'Bestätigung der Schnupperlehre bei Adobe Systems Schweiz',
      fileSize:    '~80 KB',
      available:   false, // [TODO: Ivan — add if you have the document]
      path:        '/school/documents/Schnupperlehre_Bestaetigung.pdf',
    },
  ];
</script>

<svelte:head>
  <title>Dokumente — Ivan Matiash</title>
  <!-- Documents page must not be indexed by search engines -->
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content="Bewerbungsunterlagen von Ivan Matiash (geschützter Bereich)." />
</svelte:head>

<header class="page-head">
  <h1>Dokumente</h1>
</header>

<div class="notice" role="note">
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.4" />
    <line x1="7.5" y1="6.5" x2="7.5" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="7.5" cy="4.5" r="0.75" fill="currentColor" />
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

<style>
  .page-head {
    margin-bottom: 1.5rem;
  }

  h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0;
    color: var(--s-text);
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
    color: var(--s-muted);
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
