import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { BlogPageProps, CATEGORIES_QUERY, Post, POSTS_QUERY } from "@/sanity/lib/queries";
import { Card, Label, ListBox, Select } from "@heroui/react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function BlogPage({ params }: BlogPageProps) {
    const { locale } = await params;

    const { data: posts } = (await sanityFetch({
        query: POSTS_QUERY,
        params: { locale },
    })) as { data: Post[] };

    const { data: categories } = (await sanityFetch({
        query: CATEGORIES_QUERY
    })) as { data: { _id: string; title: string }[] };

    const t = await getTranslations({
        locale,
        namespace: "HomePage",
    });

    const formateador = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US",
        {
            timeZone: "America/Monterrey",
            dateStyle: "full",
        }
    );

    return (
        <div className="max-w-400 mx-auto grid gap-10 px-10 py-16">
            <div className="grid gap-3">
                <h1 className="font-black text-2xl">{t("title")}</h1>
                <text>{t("text")}</text>
            </div>

            {/* <Select className="w-[256px]" placeholder="Select one">
                <Label>{t("blogSection.dropdown.category")}</Label>

                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                    <ListBox>
                        {categories.map((category) => (
                            <ListBox.Item key={category._id} id={category._id} textValue={category.title}>
                                {category.title}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select> */}

            {posts?.length === 0 ? (
                <p className="text-center text-red-600">Error: No posts found</p>
            ) : (
                <div className="grid gap-6 grid-cols-4">
                    {posts?.map((post) => {
                        let fechaFormateada = "Sin fecha";

                        if (post.publishedAt) {
                            const date = new Date(post.publishedAt);

                            if (!isNaN(date.getTime())) {
                                fechaFormateada = formateador.format(date);
                            }
                        }

                        return (
                            <Card key={post._id} className="group relative h-70 overflow-hidden rounded-xl">
                                <Link href={`/${locale}/${post.slug?.current}`} className="w-full">
                                    <div
                                        className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                                        style={{ backgroundImage: post.mainImage?.asset && `url(${urlFor(post.mainImage.asset).url()})`, }}
                                    />

                                    <div className="absolute inset-x-0 top-0 h-50 bg-linear-to-b from-black/40 via-black/10 to-transparent" />

                                    <Card.Header className="relative z-10 text-white">
                                        <Card.Title className="w-fit rounded-full bg-black px-4 py-px text-xs font-semibold tracking-wide text-white">
                                            {post.author?.name || "No author"}
                                        </Card.Title>
                                    </Card.Header>

                                    <Card.Footer className="absolute bottom-0 left-0 z-10 mt-auto flex w-full items-center justify-between bg-linear-to-t from-black/70 via-black/50 to-transparent px-3 py-3">
                                        <div>
                                            <h3 className="text-sm font-medium text-white">{post.title || "No title"}</h3>
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
            )}
        </div>
    );
}