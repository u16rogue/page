import type { LayoutServerLoad } from "./$types";
import fs from "node:fs";
import path from "node:path";

export const prerender = true;

export const load: LayoutServerLoad = async function (event) {
  const routes_dir = './src/routes';
  for (const file of fs.readdirSync(routes_dir)) {
    const fullpath = path.join(routes_dir, file, '_meta.ts');
    if (!fs.existsSync(fullpath)) {
      continue;
    }

    console.debug(`${fullpath}`);
    //for (const dir2 of fs.readdirSync('./src/routes')) {
    //}
  }
  return {};
};
