import fs from "fs";
import path from "path";
import { compile as mdsvex_compile, escapeSvelte as mdsvex_escapesvelte } from "mdsvex";
import { createHighlighter } from "shiki";

const highlight_config = {
  themes: ['catppuccin-mocha'],
  langs: [ 'typescript', 'cpp', 'c', 'json' ],
};

const _highlighter = await createHighlighter(highlight_config);

export type ArticleMetadata = {
  id?: string,
  title?: string,
  description?: string,
  thumbnail?: string,
  tags?: Array<string>,
  stamps?: {
    created?: Date,
    added?:   Date,
    edited?:  Date,
  }
};

export async function load_metadata(path: string): Promise<{ ok: true, value: ArticleMetadata } | { ok: false, reason?: string }> {
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

async function try_load_content_markdown(article_dir: string) {
  const content_path = path.join(article_dir, 'content.md');
  if (!fs.existsSync(content_path)) {
    return undefined;
  }

  return {
    type: 'markdown',
    value: await mdsvex_compile(fs.readFileSync(content_path).toString(), {
      highlight: {
        highlighter: async (code: string, lang: string | null | undefined) => {
          return mdsvex_escapesvelte(_highlighter.codeToHtml(code, { lang: lang!, theme: highlight_config.themes[0] }));
        },
      }
    }),
  };
}

export async function load_content(article_dir: string) {
  return try_load_content_markdown(article_dir) || null;
};
