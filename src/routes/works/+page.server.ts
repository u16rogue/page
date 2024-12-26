import type { PageMetadata } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { base } from "$app/paths";

/***metadata***
{
  "nav": {
    "include": true,
    "display": {
      "text": "works"
    }
  }
}
**************/

export const load: PageServerLoad = async function (event) {
  return {
    _meta: {
      nav: {
        display: {
          text: 'works',
          href: `${base}/works`,
        },
      },
      page: {
        title: 'works',
      },
    } satisfies PageMetadata,
  };
};
