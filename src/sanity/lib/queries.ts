import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] {
    _id,
    body,
    mainImage {
      alt,
      asset {
        _ref
      }
    },
    publishedAt,
    slug {
      current
    },
    title,
    author -> {
      name
    }
  }
`);