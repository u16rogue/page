<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import type { PageMeta } from "$lib/types";
  import { base } from "$app/paths";
  const meta = page.data?.meta as PageMeta;
</script>

<svelte:head>
  <title>{meta?.nav?.title || '<no title>'} | 🐀</title>
</svelte:head>

<div class="main">
  <div class="top-nav">
    <div class="top-nav-left">
      <div class="navdrop">
        <a class="navanchor" href="{meta?.nav?.display?.href || `${base}/`}">{meta?.nav?.display?.text || meta?.nav?.title || '<err>'}</a>
        <div class="navdropper">
        </div>
      </div>
    </div>
    <div class="top-nav-center">
    </div>
    <div class="top-nav-right"></div>
  </div>
  <slot/>
</div>

<style>
  .main {
    width: 100vw;
    height: 100vh;
  }

  .navanchor {
    font-size: 1.15rem;
    font-weight: 500;
  }

  .navdropper {
    display: none;
    flex-direction: column;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
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
