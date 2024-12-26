import { base } from "$app/paths";
import fs from "node:fs";
import path from "node:path";

export type RouteMetadata = { ok: false, message: string } | {
  ok: true,
  filepath: string,
  data: {
    nav?: {
      include?: boolean,
      display?: {
        text?: string,
        href?: string,
      },
    },
  },
};

export const load_metadata = function (route: string): RouteMetadata {
  if (route.startsWith(base)) {
    route = route.substring(base.length);
  }

  if (!route.startsWith('src/routes')) {
    route = path.join('src/routes', route);
  }

  if (!route.endsWith('+page.server.ts')) {
    route = path.join(route, '+page.server.ts');
  }

  if (!fs.existsSync(route)) {
    return { ok: false, message: `no file (${route})` };
  }

  const metadata = /\*\*\*metadata\*\*\*\s*(\{.*\})\s*\*{10,}/s.exec(fs.readFileSync(route).toString())?.[1];
  if (!metadata) {
    return { ok: false, message: `no metadata (${route})` };
  }

  try {
    const object = JSON.parse(metadata);
    return { ok: true, filepath: route, data: { ...object }, };
  } catch {
    return { ok: false, message: 'parser exception' };
  }
};
