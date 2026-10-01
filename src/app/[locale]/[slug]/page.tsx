import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { PortableText, type PortableTextBlock } from "next-sanity";

// Define the shape of a post returned by the Sanity query.
type Post = {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: { asset: { _ref: string } };
    author?: { name: string };
    publishedAt?: string;
    body?: PortableTextBlock[];
};

type PageProps = {
    params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogInsidePage({ params }: PageProps) {

    const { locale, slug } = await params;

    const { data: post } = await sanityFetch({
        query: POST_QUERY,
        params: {
            slug,
        },
    }) as { data: Post };

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>{post?.title}</h1>
            <PortableText value={post.body} />
        </div>
    );
}