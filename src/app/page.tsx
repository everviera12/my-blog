import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
  });

  console.log(data);

  return (
    <div>
      <h1 className="font-black text-2xl pb-6">Next & Sanity App</h1>
      <Link href="/studio">Go to studio page →</Link>

      <h2>Check our latest Posts! ⬇️</h2>

      {data?.map((post) => (
        <article key={post._id}>
          <h1>{post.title}</h1>
        </article>
      ))}
    </div>
  );
}