<script lang="ts">
  let { name, level }: { name: string; level: number } = $props();

  const clamped = $derived(Math.max(1, Math.min(5, level)));
  const pct = $derived((clamped / 5) * 100);
</script>

<div class="row">
  <span class="name">{name}</span>
  <div
    class="track"
    role="progressbar"
    aria-valuenow={clamped}
    aria-valuemin={1}
    aria-valuemax={5}
    aria-label="{name}: {clamped} von 5"
  >
    <div class="fill" style="width: {pct}%"></div>
  </div>
  <span class="level">{clamped}/5</span>
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: 200px 1fr 36px;
    align-items: center;
    gap: 0.75rem;
    padding: 0.4rem 0;
  }

  .name {
    font-size: 0.875rem;
    color: var(--s-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track {
    height: 5px;
    background: var(--s-bar-bg);
    border-radius: 3px;
    overflow: hidden;
  }

  .fill {
    height: 100%;
    background: var(--s-bar-fill);
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .level {
    font-size: 0.72rem;
    color: var(--s-muted);
    font-family: 'VT323', monospace;
    text-align: right;
  }

  @media (max-width: 520px) {
    .row {
      grid-template-columns: 150px 1fr 32px;
      gap: 0.5rem;
    }
  }
</style>
