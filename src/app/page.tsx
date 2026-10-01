import Link from "next/link";

export default function HomePage() {
    return (
        <div className="grid gap-3 w-fit pt-6">
            <Link href="/en">English</Link>
            <Link href="/es">Español</Link>
        </div>
    );
}