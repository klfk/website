<script lang="ts">
  import { translations, type Lang } from '$lib/i18n';

  let {
    title,
    description,
    tech,
    learned,
    link = null,
    linkLabel = null,
    lang = 'de',
  }: {
    title: string;
    description: string;
    tech: readonly string[];
    learned: string;
    link?: string | null;
    linkLabel?: string | null;
    lang?: Lang;
  } = $props();

  const href = $derived(
    link == null ? null : link.startsWith('http') ? link : `https://${link}`
  );

  const t = $derived(translations[lang]);
</script>

<article class="card">
  <header class="card-head">
    <h3 class="card-title">{title}</h3>
    {#if href}
      <a
        {href}
        target="_blank"
        rel="noopener noreferrer"
        class="card-link"
        aria-label="Open {title}"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          <path d="M8 1h3m0 0v3m0-3L5.5 6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {linkLabel ?? link}
      </a>
    {:else}
      <span class="no-link">{t.no_link}</span>
    {/if}
  </header>

  <p class="desc">{description}</p>

  <div class="tags">
    {#each tech as tag}
      <span class="tag">{tag}</span>
    {/each}
  </div>

  <div class="learned-row">
    <span class="learned-label">{t.learned}</span>
    <span class="learned-text">{learned}</span>
  </div>
</article>

<style>
  .card {
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 6px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    box-sizing: border-box;
  }

  .card-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .card-title {
    font-family: 'VT323', monospace;
    font-size: 1.15rem;
    font-weight: 400;
    letter-spacing: 0.03em;
    margin: 0;
    color: var(--s-text);
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    color: var(--s-link);
    text-decoration: none;
    flex-shrink: 0;
  }

  .card-link:hover { color: var(--s-link-hover); text-decoration: underline; }

  .no-link { font-size: 0.75rem; color: var(--s-muted); flex-shrink: 0; }

  .desc { margin: 0; font-size: 0.875rem; line-height: 1.65; color: var(--s-text); flex: 1; }

  .tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

  .tag {
    font-size: 0.72rem;
    font-family: monospace;
    color: var(--s-tag-text);
    background: var(--s-tag-bg);
    border: 1px solid var(--s-border);
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
  }

  .learned-row {
    font-size: 0.82rem;
    border-top: 1px solid var(--s-border);
    padding-top: 0.65rem;
    line-height: 1.55;
    color: var(--s-muted);
  }

  .learned-label { font-weight: 600; margin-right: 0.3rem; }
  .learned-text { color: var(--s-text); opacity: 0.82; }
</style>
