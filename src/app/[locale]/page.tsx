import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Card } from "@heroui/react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Post = {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: { asset: { _ref: string } };
    author?: { name: string };
    publishedAt?: string;
};

type PageProps = {
    params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: PageProps) {
    const { locale } = await params;
    const { data } = await sanityFetch({
        query: POSTS_QUERY,
    }) as { data: Post[] };

    const t = await getTranslations({ locale, namespace: "HomePage" });

    const formateador = new Intl.DateTimeFormat(
        locale === "es" ? "es-MX" : "en-US",
        { timeZone: "America/Monterrey", dateStyle: "full" }
    );

    return (
        <div className="max-w-400 mx-auto p-16">
            <h1 className="font-black text-2xl pb-6">{t("title")}</h1>
            <h2>{t("text")}</h2>

            <div className="grid gap-6 grid-cols-4">
                {data?.map((post) => {
                    let fechaFormateada = "Sin fecha";

                    if (post.publishedAt) {
                        const date = new Date(post.publishedAt);

                        if (!isNaN(date.getTime())) {
                            fechaFormateada = formateador.format(date);
                        }
                    }

                    return (
                        <Card key={post._id} className="group relative h-70 overflow-hidden rounded-xl">
                            <Link href={`/${locale}/${post?.slug?.current}`} className={'w-full'}>
                                <div
                                    className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: post.mainImage?.asset && `url(${urlFor(post.mainImage.asset).url()})`, }}
                                />

                                <div className="absolute inset-x-0 top-0 h-50 bg-linear-to-b from-black/40 via-black/10 to-transparent" />

                                <Card.Header className="relative z-10 text-white">
                                    <Card.Title className="w-fit rounded-full bg-black px-4 py-px text-xs font-semibold tracking-wide text-white">
                                        {post?.author?.name || "No author"}
                                    </Card.Title>
                                </Card.Header>

                                <Card.Footer className="absolute bottom-0 left-0 z-10 mt-auto flex w-full items-center justify-between bg-linear-to-t from-black/70 via-black/50 to-transparent px-3 py-3">
                                    <div>
                                        <h3 className="text-sm font-medium text-white">{post?.title || "No title"}</h3>
                                        <span className="text-xs text-white/60">{fechaFormateada}</span>
                                    </div>

                                    <button className="rounded-full bg-white px-4 py-2 text-sm text-black">
                                        {t("blogSection.cta")}
                                    </button>
                                </Card.Footer>
                            </Link>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}