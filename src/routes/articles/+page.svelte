<script lang="ts">
  let { data } = $props();
</script>

<div class="main">
  {#each data.articles as article}
    <div class="article-entry">

      {#if article.value.thumbnail}
        <div class="article-entry-img" style="background-image: url({article.value.thumbnail});"></div>
      {:else}
        <div class="article-entry-img">
          <p class="text-nothumb">No Thumbnail</p>
        </div>
      {/if}

      <div class="article-entry-info">
        <a class="article-title" href="{article.href}">{article.value.title || '<no title>'}</a>
        <p>{article.value.description || 'No description.'}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    padding: 12px;
  }

  .article-title {
    color: var(--color-3);
    font-size: 1.4rem;
    font-weight: bolder;
  }

  .article-entry-info {
    margin-left: 8px;
  }

  .article-entry-img {
    aspect-ratio: 1;
    height: 100px;
    border-style: dotted;
    border-color: var(--color-3);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .article-entry {
    border-left-style: solid;
    border-width: 6px;
    border-color: var(--color-3);
    padding: 8px;

    display: flex;
    flex-direction: row;
    align-items: center;
    height: fit-content;
  }
</style>
