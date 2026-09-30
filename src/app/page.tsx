import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Link, Card } from "@heroui/react";

export default async function HomePage() {
    const { data } = await sanityFetch({
        query: POSTS_QUERY,
    });

    console.log(data);

    return (
        <div>
            <h1 className="font-black text-2xl pb-6">Next & Sanity App</h1>
            {/* <Link href="/studio">Go to studio page →</Link> */}

            <h2>Check our latest Posts! ⬇️</h2>

            <div className="grid grid-cols-4">
                {data?.map((post) => (
                    <Card
                        key={post._id}
                        className="relative h-70 overflow-hidden rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${urlFor(post?.mainImage?.asset).url()})` }}
                    >
                        {/* Top gradient */}
                        <div className="absolute inset-x-0 top-0 h-50 bg-linear-to-b from-black/40 via-black/10 to-transparent" />

                        <Card.Header className="relative z-10 text-white">
                            <Card.Title className="w-fit rounded-full bg-black px-4 py-px text-xs font-semibold tracking-wide text-white">{post?.author?.name || "No author"}</Card.Title>
                        </Card.Header>

                        <Card.Footer className="absolute px-3 bottom-0 left-0 z-10 mt-auto flex w-full items-center justify-between bg-linear-to-t from-black/70 via-black/50 to-transparent py-3">
                            <div>
                                <h3 className="text-sm font-medium text-white">{post?.title || "No title"}</h3>
                                <span className="text-xs text-white/60">{post?.publishedAt || "No date"}</span>
                            </div>

                            <Link href={post?.slug?.current} className="rounded-full bg-white px-4 py-2 text-sm text-black">Read more</Link>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
}
