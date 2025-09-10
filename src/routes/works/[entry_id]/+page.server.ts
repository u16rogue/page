import { WORKS_DIR, WORKS_EXTERNAL_PATH } from "../config";
import type { PageServerLoad } from "./$types";
import path from "path";
import fs from "fs";
import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { WorkExternalEntry } from "$lib/types";

const load_as_dir_content = async function (event: ServerLoadEvent, path: string) {
  throw 'Not implemented';
}

export const load: PageServerLoad = async function (event) {
  if (!event.params.entry_id) {
    throw 'Invalid entry ID';
  }

  const entry_article_path = path.join(WORKS_DIR, event.params.entry_id);
  if (fs.existsSync(entry_article_path)) {
    return load_as_dir_content(event, entry_article_path);
  } else if (fs.existsSync(WORKS_EXTERNAL_PATH)) {
    const entries_obj = JSON.parse(fs.readFileSync(WORKS_EXTERNAL_PATH).toString()) as Array<WorkExternalEntry>;
    const href = entries_obj.find(x => x.id === event.params.entry_id);
    if (href && href.repourl) throw redirect(303, href.repourl);
  }

  throw 'Invalid work entry';
};
