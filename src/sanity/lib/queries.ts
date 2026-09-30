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

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
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