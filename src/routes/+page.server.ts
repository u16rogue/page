import { base } from "$app/paths";
import type { PageMeta } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function (event) {
  return {
    meta: {
      nav: {
        route: `${base}/`,
        title: 'Home',
        display: {
          text: 'home',
          href: `${base}/`,
        },
      },
    } satisfies PageMeta,
  };
};
