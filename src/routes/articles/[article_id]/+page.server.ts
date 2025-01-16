import path from "path";
import fs from "fs";
import type { PageServerLoad } from "./$types";
import { ARTICLES_DIR } from "../config";
import type { PageMetadata } from "$lib/types";
import { base } from "$app/paths";

import { compile as mdsvex_compile, escapeSvelte as mdsvex_escapesvelte } from "mdsvex";
import { createHighlighter } from "shiki";

const highlight_config = {
  themes: ['catppuccin-mocha'],
  langs: [ 'typescript', 'cpp', 'c', 'json' ],
};

const _highlighter = await createHighlighter(highlight_config);

export const load: PageServerLoad = async function (event) {
  if (!event.params.article_id) {
    throw 'invalid article id parameter';
  }

  const article_dir = path.join(ARTICLES_DIR, event.params.article_id);
  const metadata_path = path.join(article_dir, 'metadata.json');
  if (!fs.existsSync(article_dir)) {
    throw 'invalid directory path from article id';
  }

  return {
    content: {
      type: 'markdown',
      value: await mdsvex_compile(fs.readFileSync(path.join(article_dir, 'content.md')).toString(), {
        highlight: {
          highlighter: async (code: string, lang: string | null | undefined) => {
            return mdsvex_escapesvelte(_highlighter.codeToHtml(code, { lang: lang!, theme: highlight_config.themes[0] }));
          },
        }
      }),
    },
    _meta: {
      nav: {
        display: {
          text: 'article',
          href: `${base}/articles`,
        },
      },
      page: {
        title: 'Article',
      },
    } satisfies PageMetadata,
  };
};
