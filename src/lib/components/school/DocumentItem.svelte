<script lang="ts">
  import { translations, type Lang } from '$lib/i18n';

  let {
    filename,
    description,
    fileSize,
    available,
    path,
    lang = 'de',
  }: {
    filename: string;
    description: string;
    fileSize: string;
    available: boolean;
    path: string;
    lang?: Lang;
  } = $props();

  const t = $derived(translations[lang]);
</script>

<li class="item">
  <div class="info">
    <div class="name-row">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="doc-icon">
        <rect x="2" y="1" width="8.5" height="12" rx="1" stroke="currentColor" stroke-width="1.4" />
        <path d="M4 5h4.5M4 7.5h4.5M4 10h2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
      </svg>
      <span class="filename">{filename}</span>
    </div>
    <p class="desc">{description}</p>
  </div>

  <div class="actions">
    <span class="size">{fileSize}</span>
    {#if available}
      <a
        href={path}
        download={filename}
        class="dl-btn"
        aria-label="{t.download} {filename}"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M6.5 1v7M3.5 5.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M1.5 10v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        {t.download}
      </a>
    {:else}
      <span class="dl-btn disabled" aria-disabled="true" aria-label="{t.coming_soon}">
        {t.coming_soon}
      </span>
    {/if}
  </div>
</li>

<style>
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 6px;
    flex-wrap: wrap;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
    flex: 1;
  }

  .name-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .doc-icon { color: var(--s-muted); flex-shrink: 0; }

  .filename {
    font-family: monospace;
    font-size: 0.8rem;
    color: var(--s-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .desc { margin: 0; font-size: 0.8rem; color: var(--s-muted); padding-left: 1.4rem; }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .size { font-size: 0.72rem; color: var(--s-muted); font-family: monospace; }

  .dl-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.85rem;
    border: 1px solid var(--s-btn-border);
    background: var(--s-btn-bg);
    color: var(--s-btn-text);
    border-radius: 4px;
    font-size: 0.78rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .dl-btn:not(.disabled):hover {
    background: var(--s-surface-alt);
    border-color: var(--s-text);
  }

  .dl-btn.disabled {
    cursor: default;
    opacity: 0.4;
    pointer-events: none;
  }

  @media (max-width: 560px) {
    .item { flex-direction: column; align-items: flex-start; }
    .actions { align-self: flex-end; }
  }
</style>
