import Link from "next/link";

export default function HomePage() {


    return (
        <div>
            <h1 className="font-black text-2xl pb-6">Next & Sanity App</h1>

            <div className="grid w-fit gap-3">
                <Link href="/studio">Go to studio page →</Link>
                <Link href="/blog">Go to blog page →</Link>
            </div>
        </div>
    );
}
