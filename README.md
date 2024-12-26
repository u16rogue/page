# www-v2
svelte static website

## Libraries

* mdsvex
* shiki

## Conventions 
* Route metadata loading for root layout: 
  * For preloading / fetching / page not viewed or loaded yet, use metadata comments on `+page.server.ts`:
    ```
    /***metadata***
    {}
    **************/
    ```
  * For loaded page use `_meta` data prop.
