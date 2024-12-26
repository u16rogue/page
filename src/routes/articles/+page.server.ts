import type { PageMetadata } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { base } from "$app/paths";

/***metadata***
{
  "nav": {
    "include": true,
    "display": {
      "text": "articles"
    }
  }
}
**************/

export const load: PageServerLoad = async function (event) {
  return {
    _meta: {
      nav: {
        display: {
          text: 'articles',
          href: `${base}/articles`,
        },
      },
      page: {
        title: 'articles',
      },
    } satisfies PageMetadata,
  };
};
