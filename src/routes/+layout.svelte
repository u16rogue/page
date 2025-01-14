<script lang="ts">
  import "../app.css";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import type { LayoutData } from "./$types";
  export let data: LayoutData;
</script>

<svelte:head>
  <title>{$page?.data?._meta?.page?.title || '<no title>'} | 🐀</title>
</svelte:head>

<div class="main">
  <div class="top-nav">
    <div class="top-nav-left">
      <div class="navdrop">
        <a class="navanchor" href="{$page?.data?._meta?.nav?.display?.href || `${base}/`}">{$page?.data?._meta?.nav?.display?.text || '<no name>'}</a>
        <div class="navdropper">
          {#each data?.nav?.navs as nav}
            <a href="{nav.href || '/error?reason=noroute'}">{nav.text || '<no display text>'}</a>
          {/each}
        </div>
      </div>
    </div>
    <div class="top-nav-center">
    </div>
    <div class="top-nav-right"></div>
  </div>
  <div class="slot-content">
    <slot/>
  </div>
</div>

<style>
  .main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .slot-content {
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
  }

  .navanchor {
    font-size: 1.15rem;
    font-weight: 500;
  }

  .navdropper {
    display: none;
    flex-direction: column;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 8px;
    min-width: 100px;
  }

  .navdropper > a {
    text-decoration: none;
    border-left: solid;
    border-left-width: 2px;
    padding-left: 8px;
    margin: 1px 0px;
  }

  .navdropper > a:hover {
    text-decoration: var(--anchor-decoration);
  }

  .navdrop:hover > .navdropper {
    display: flex;
  }

  .top-nav-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 200px;
  }

  .top-nav-center {
    flex-grow: 1;
  }

  .top-nav {
    padding: 2px 12px;
    background-color: var(--color-2);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
