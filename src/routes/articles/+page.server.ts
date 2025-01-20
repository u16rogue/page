import type { PageMetadata } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { base } from "$app/paths";
import fs from "fs";
import path from "path";
import type { ArticleMetadata } from "$lib/server/core/articles";
import { ARTICLES_DIR } from "./config";
import { load_metadata } from "$lib/server/core/articles";

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

type ProcessedEntry = {
  value: ArticleMetadata,
  href: string,
};

export const load: PageServerLoad = async function (event) {
  if (!fs.existsSync(ARTICLES_DIR)) {
    throw "Articles directory not found.";
  }

  const sorted_entries:   Array<ProcessedEntry> = [];
  const unsorted_entries: Array<ProcessedEntry> = [];

  for (const dir of fs.readdirSync(ARTICLES_DIR)) {
    const dir1 = path.join(ARTICLES_DIR, dir);
    const metadata = await load_metadata(path.join(dir1, 'metadata.json'));
    if (!metadata.ok) {
      continue;
    }

    const processed_entry = { value: metadata.value, href: `${base}/articles/${dir}` };
    if (metadata.value.stamps?.edited || metadata.value.stamps?.added || metadata.value.stamps?.created) {
      sorted_entries.push(processed_entry);
    } else {
      unsorted_entries.push(processed_entry);
    }
  }

  sorted_entries.sort(function (a, b) {
    const aa = a.value.stamps?.edited || a.value.stamps?.added || a.value.stamps?.created;
    const bb = b.value.stamps?.edited || b.value.stamps?.added || b.value.stamps?.created;

    if (!aa || !bb) {
      throw 'timestamp on sorted_articles should never result to nil';
    }

    if (aa == bb) {
      return 0;
    } else if (aa > bb) {
      return 1;
    } else if (aa < bb) {
      return -1;
    }

    throw 'unsortable date. filter failed';
  });

  sorted_entries.push(...unsorted_entries);

  return {
    articles: sorted_entries,
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
