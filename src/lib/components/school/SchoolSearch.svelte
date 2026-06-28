<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { translations, type Lang } from '$lib/i18n';

  let { onclose }: { onclose: () => void } = $props();

  const langCtx = getContext<{ current: Lang }>('lang');

  let query = $state('');
  let inputEl: HTMLInputElement;

  const t = $derived(translations[langCtx.current].search);

  const results = $derived(
    query.trim().length < 2
      ? []
      : t.index.filter((item) => {
          const q = query.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
          );
        }).slice(0, 12)
  );

  function handleBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('backdrop')) onclose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose();
  }

  onMount(() => {
    inputEl?.focus();
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="backdrop"
  role="dialog"
  aria-modal="true"
  aria-label={t.aria}
  tabindex="-1"
  onclick={handleBackdrop}
  onkeydown={handleKeydown}
>
  <div class="panel">
    <div class="input-row">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="search-icon">
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <input
        bind:this={inputEl}
        bind:value={query}
        type="search"
        class="search-input"
        placeholder={t.placeholder}
        autocomplete="off"
        spellcheck="false"
        aria-label={t.input_aria}
      />
      <button class="esc-btn" onclick={onclose} aria-label={t.close_aria}>Esc</button>
    </div>

    <div class="results-area">
      {#if query.trim().length < 2}
        <p class="hint">{t.hint}</p>
      {:else if results.length === 0}
        <p class="hint">{t.no_results} „{query}".</p>
      {:else}
        <ul class="result-list" role="listbox" aria-label={t.aria}>
          {#each results as item}
            <li role="option" aria-selected="false">
              <a href={item.href} class="result" onclick={onclose}>
                <span class="result-type">{item.type}</span>
                <span class="result-body">
                  <span class="result-title">{item.title}</span>
                  <span class="result-desc">{item.desc}</span>
                </span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 12vh;
  }

  .panel {
    width: min(580px, 92vw);
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid var(--s-border);
  }

  .search-icon { color: var(--s-muted); flex-shrink: 0; }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--s-text);
    font-size: 0.95rem;
    font-family: inherit;
    -webkit-appearance: none;
    appearance: none;
  }

  .search-input::placeholder { color: var(--s-muted); }

  .esc-btn {
    background: var(--s-surface-alt);
    border: 1px solid var(--s-border);
    color: var(--s-muted);
    font-size: 0.68rem;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    cursor: pointer;
    font-family: monospace;
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }

  .results-area { max-height: 380px; overflow-y: auto; }

  .hint {
    padding: 1.25rem 1rem;
    color: var(--s-muted);
    font-size: 0.875rem;
    text-align: center;
    margin: 0;
  }

  .result-list { list-style: none; margin: 0; padding: 0; }
  .result-list li { border-bottom: 1px solid var(--s-border); }
  .result-list li:last-child { border-bottom: none; }

  .result {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 0.75rem;
    padding: 0.7rem 1rem;
    text-decoration: none;
    color: var(--s-text);
    transition: background 0.1s ease;
    align-items: center;
  }

  .result:hover { background: var(--s-surface-alt); }

  .result-type {
    font-size: 0.66rem;
    color: var(--s-muted);
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    line-height: 1;
    text-align: right;
    padding-right: 0.25rem;
    border-right: 1px solid var(--s-border);
    align-self: center;
  }

  .result-body { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }

  .result-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--s-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .result-desc {
    font-size: 0.76rem;
    color: var(--s-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
