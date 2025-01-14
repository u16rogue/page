import type { PageMetadata } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { base } from "$app/paths";
import fs from "fs";
import path from "path";
import type { ArticleMetadata } from "$lib/types/articlemeta";

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

const ARTICLES_DIR = path.join('content', 'articles');

async function load_metadata(path: string): Promise<{ ok: true, value: ArticleMetadata } | { ok: false, reason?: string }> {
  const fail = function (reason: string | undefined): { ok: false, reason?: string} {
    return { ok: false, reason };
  };

  if (!fs.existsSync(path)) {
    return fail('not implemented');
  }

  let metadata = null;
  try {
    metadata = JSON.parse(fs.readFileSync(path).toString());
    if (!metadata) throw '';
  } catch {
    return fail('exception');
  }

  for (const stamp in metadata.stamps) {
    metadata.stamps[stamp] = new Date(metadata.stamps[stamp]);
  }

  return { ok: true, value: metadata };
}

export const load: PageServerLoad = async function (event) {
  if (!fs.existsSync(ARTICLES_DIR)) {
    throw "Articles directory not found.";
  }

  for (const dir of fs.readdirSync(ARTICLES_DIR)) {
    const dir1 = path.join(ARTICLES_DIR, dir);
    const metadata = await load_metadata(path.join(dir1, 'metadata.json'));
    if (!metadata.ok) {
      continue;
    }


  }

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
