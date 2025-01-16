import fs from "fs";

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
