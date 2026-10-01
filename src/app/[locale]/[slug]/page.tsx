import { sanityFetch } from "@/sanity/lib/live";
import { BlogPageProps, Post, POST_QUERY } from "@/sanity/lib/queries";
import { PortableText, } from "next-sanity";

export default async function BlogInsidePage({ params }: BlogPageProps) {
    const { locale, slug } = await params;

    const { data: post } = (await sanityFetch({
        query: POST_QUERY,
        params: { locale, slug },
    })) as { data: Post | null };

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <PortableText value={post.body ?? []} />
        </div>
    );
}