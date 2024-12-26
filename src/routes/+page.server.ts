import { base } from "$app/paths";
import type { PageMetadata } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function (event) {
  return {
    _meta: {
      nav: {
        display: {
          text: 'home',
          href: `${base}/`,
        },
      },
      page: {
        title: 'home',
      },
    } satisfies PageMetadata,
  };
};
