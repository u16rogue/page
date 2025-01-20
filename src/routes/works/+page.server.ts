import { base } from "$app/paths";
import type { PageMetadata } from "$lib/types";
import type { PageServerLoad } from "./$types";
import fs from "fs";
import path from "path";
import { WORKS_DIR, WORKS_LINKONLY_PATH } from "./config";

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

type ProcessedEntries = {
  thumbnail?: string,
  title?: string,
  description?: string,
  href?: string,
  tags?: Array<string>,
};

export const load: PageServerLoad = async function (event) {
  if (!fs.existsSync(WORKS_DIR)) {
    throw 'missing content directory';
  }

  const sorted_entries: Array<ProcessedEntries> = [];
  const unsorted_entries: Array<ProcessedEntries> = [];

  // TODO: implement rest of the entry loading
  for (const entry of fs.readdirSync(WORKS_DIR)) {
    const fpath = path.join(WORKS_DIR, entry);
    const metadata_path = path.join(fpath, 'metadata.json');
    if (!fs.existsSync(metadata_path)) {
      continue;
    }
  }

  if (fs.existsSync(WORKS_LINKONLY_PATH)) {
    const lnkonly: Array<{
      icon?: string,
      title?: string,
      description?: string,
      repourl?: string,
      tags?: Array<string>,
    }> = JSON.parse(fs.readFileSync(WORKS_LINKONLY_PATH).toString());
    lnkonly.forEach(function (x) {
      unsorted_entries.push({
        thumbnail: x.icon,
        title: x.title,
        description: x.description,
        href: x.repourl,
        tags: x.tags,
      });
    });
  }

  sorted_entries.push(...unsorted_entries);

  return {
    works: sorted_entries,
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
