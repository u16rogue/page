export type PageMetadata = {
  nav?: {
    display?: {
      text?: string,
      href?: string,
    },
  },
  page?: {
    title?: string,
  },
};

export type WorkExternalEntry = {
  id?: string,
  icon?: string,
  title?: string,
  description?: string,
  repourl?: string,
  tags?: Array<string>,
};
