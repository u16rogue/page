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

type ProcessedArticleEntry = {
  value: ArticleMetadata,
  path: string,
};

export const load: PageServerLoad = async function (event) {
  if (!fs.existsSync(ARTICLES_DIR)) {
    throw "Articles directory not found.";
  }

  const sorted_articles:   Array<ProcessedArticleEntry> = [];
  const unsorted_articles: Array<ProcessedArticleEntry> = [];

  for (const dir of fs.readdirSync(ARTICLES_DIR)) {
    const dir1 = path.join(ARTICLES_DIR, dir);
    const metadata = await load_metadata(path.join(dir1, 'metadata.json'));
    if (!metadata.ok) {
      continue;
    }

    const processed_entry = { value: metadata.value, path: dir };
    if (metadata.value.stamps?.edited || metadata.value.stamps?.added || metadata.value.stamps?.created) {
      sorted_articles.push(processed_entry);
    } else {
      unsorted_articles.push(processed_entry);
    }
  }

  sorted_articles.sort(function (a, b) {
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

  sorted_articles.push(...unsorted_articles);

  return {
    articles: sorted_articles,
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
