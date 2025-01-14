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
