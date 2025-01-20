import path from "path";
import fs from "fs";
import type { PageServerLoad } from "./$types";
import { ARTICLES_DIR } from "../config";
import type { PageMetadata } from "$lib/types";
import { base } from "$app/paths";
import { load_content, load_metadata } from "$lib/server/core/articles";

export const load: PageServerLoad = async function (event) {
  if (!event.params.article_id) {
    throw 'invalid article id parameter';
  }

  const article_dir = path.join(ARTICLES_DIR, event.params.article_id);
  const metadata_path = path.join(article_dir, 'metadata.json');
  if (!fs.existsSync(article_dir)) {
    throw 'invalid directory path from article id';
  }

  const metadata = await load_metadata(metadata_path);
  if (!metadata.ok) {
    throw 'invalid metadata';
  }

  const content = await load_content(article_dir);
  if (!content) {
    throw 'unloadable content';
  }

  return {
    content: content!,
    _meta: {
      nav: {
        display: {
          text: 'article',
          href: `${base}/articles`,
        },
      },
      page: {
        title: metadata.value.title || '<untitled article>',
      },
    } satisfies PageMetadata,
  };
};
