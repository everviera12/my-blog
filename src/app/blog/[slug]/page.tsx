import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function BlogInsidePage({ params }: PageProps) {

    const { slug } = await params;

    const { data: post } = await sanityFetch({
        query: POST_QUERY,
        params: {
            slug,
        },
    });

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