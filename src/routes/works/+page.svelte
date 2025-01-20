<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="main">
  {#each data.works as entry}
    <div class="entry">
      {#if entry.thumbnail}
        <div class="entry-thumbnail" style="background-image: url({entry.thumbnail});">
        </div>
      {:else}
        <div class="entry-thumbnail">
          <p>No Thumbnail</p>
        </div>
      {/if}
      <a class="entry-title" href="{entry.href}">{entry.title || '<no title>'}</a>
      <p class="entry-description">{entry.description}</p>
    </div>
  {/each}
</div>

<style>
  .main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    overflow-y: auto;
    height: 100%;
    padding: 4px;
    box-sizing: border-box;
  }

  .entry-thumbnail {
    width: 100px;
    aspect-ratio: 1;
    border-style: dotted;
    border-color: var(--color-3);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
  }

  .entry-thumbnail > p {
    margin: auto;
    text-align: center;
  }

  .entry {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-style: dotted;
    border-width: 0.5px;
    border-color: var(--color-3);
    padding: 8px;
  }

  .entry-description {
    font-size: 0.8rem;
    text-align: center;
  }

  .entry-title {
    font-size: 1.2rem;
    text-align: center;
  }
</style>
