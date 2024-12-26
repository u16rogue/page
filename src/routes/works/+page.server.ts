import type { PageMeta } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function (event) {
  return {
    meta: {} satisfies PageMeta,
  };
};
