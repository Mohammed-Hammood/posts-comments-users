import { NextRequest, NextResponse } from "next/server";
import data from "./data.json";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query: string | null = searchParams.get("query");
    const page: string | null = searchParams.get("page");
    const numberRegex:RegExp = /^\d+$/;
    let posts: Post[] = data;

    if (query) {
        const q: string = query.trim().toLowerCase();

        const search = (text: string): boolean => text.toLowerCase().includes(q);

        posts = data.filter(({ title }) => search(title));

    }

    const posts_count = posts.length;

    if (page && numberRegex.test(page) && parseInt(page) >= 1) {
        const max: number = parseInt(page) * 10;
        const min: number = max - 10;

        posts = posts.filter((_, index: number) => index >= min && index < max);
    }else {
        posts = posts.filter((_, index: number) => index < 10);
    }

    return NextResponse.json({
        ok: true,
        status: 200,
        query,
        page,
        posts_count,
        posts,
    })
}