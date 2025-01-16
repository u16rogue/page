<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  onMount(async function () {
    document
      ?.querySelector('.content-markdown')
      ?.querySelectorAll('code')
      ?.forEach(function (e) {
        e.style.cursor = 'pointer';
        e.onclick = function () {
          navigator.clipboard.writeText(e.innerText);
        };
      })
    ;
  });
</script>

<div class="main">
  {#if data.content.type === 'markdown'}
    <div class="content content-markdown">
      {@html data.content.value?.code}
    </div>
  {:else}
    <p>Unsupported content type</p>
  {/if}
</div>

<style>
  .main {
    height: 100%;
    display: grid;
  }

  /*------------------------------*/

  .content-markdown :global(img) {
    border-style: dashed;
    border-width: 2px;
    border-color: #826a6b;
  }

  .content-markdown :global(p) {
    margin: 0;
  }

  .content-markdown :global(a) {
    color: #5bf8ff;
    text-decoration: underline dotted;
  }

  .content-markdown :global(code) {
    background-color: #2d293b;
    width: fit-content;
    padding: 1px;
    margin: 1px;
    border-color: #826a6b;
  }

  .content-markdown :global(pre:has(code) > code) {
    background-color: #00000000;
  }

  .content-markdown :global(pre:has(code)) {
    background-color: #2d293b;
    padding: 8px;
    width: fit-content;
    border-left-style: dotted;
    border-width: 4px;
    border-color: #826a6b;
  }

  .content-markdown :global(blockquote) {
    background-color: #2d293b;
    padding: 8px;
    text-align: center;
    border-left-style: dotted;
    font-style: italic;
    width: fit-content;
    border-color: #826a6b;
  }

  .content-markdown :global(table) {
    border-style: dashed;
    border-width: 1px;
    border-color: #826a6b;
  }

  .content-markdown :global(thead) {
    font-weight: bolder;
    font-size: 1.1rem;
    background-color: #2d293b;
  }

  .content-markdown :global(tbody > tr:nth-of-type(even)) {
    background-color: #363648;
  }

  .content-markdown :global(tbody > tr:nth-of-type(odd)) {
    background-color: #3b3b5b;
  }

  .content-markdown :global(th) {
    padding: 6px;
  }

  .content-markdown :global(td) {
    padding: 4px;
  }

  .content-markdown :global(h1) {
  }

  .content-markdown {
    padding: 8px 5vw;
    overflow-y: auto;
    color: var(--color-3);
  }

  /*------------------------------*/

</style>
