import { defineQuery } from "next-sanity";
import { PortableTextBlock } from "sanity";

{/** TYPES **/ }
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: {
    asset: { _ref: string }
  };
  author?: {
    name: string;
    slug: { current: string }
  };
  publishedAt?: string;
  body: PortableTextBlock[]
}

export interface BlogPageProps {
  params: Promise<{ locale: string; slug: string; }>;
}

{/** SANITY QUERIES **/ }
export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] {
    _id,

    "title": select(
      $locale == "es" => content.es.title,
      $locale == "en" => content.en.title
    ),

    "slug": {
      "current": select(
        $locale == "es" => content.es.slug.current,
        $locale == "en" => content.en.slug.current
      )
    },

    author -> {
      name,
      slug {
        current
      }
    },

    mainImage {
      asset {
        _ref
      }
    },

    publishedAt
  }
`);

export const POST_QUERY = defineQuery(`
  *[
    _type == "post" &&
    select(
      $locale == "es" => content.es.slug.current,
      $locale == "en" => content.en.slug.current
    ) == $slug
  ][0] {

    _id,

    "title": select(
      $locale == "es" => content.es.title,
      $locale == "en" => content.en.title
    ),

    "slug": {
      "current": select(
        $locale == "es" => content.es.slug.current,
        $locale == "en" => content.en.slug.current
      )
    },

    "body": select(
      $locale == "es" => content.es.body,
      $locale == "en" => content.en.body
    ),

    mainImage {
      alt,
      asset {
        _ref
      }
    },

    publishedAt,

    author -> {
      name
    }
  }
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] {
  _id,
  slug {
    current
  },
  title
}`)