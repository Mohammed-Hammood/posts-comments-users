import { NextRequest, NextResponse } from "next/server";
import commentsData from "./comments.json";
import usersData from "./users.json";
import posts from "@/app/api/posts/data.json";

export async function GET(request: NextRequest, { params:{ post_id} }: { params: { post_id: string } }) {
    const numberRegex = /^\d+$/

    if (!numberRegex.test(post_id)) {
        return NextResponse.json({
            ok: false,
            post_id,
            status: 400,
            message: "Post id should be a number"
        })
    }

    const comments = commentsData.filter(item => item.postId === parseInt(post_id));
    
    const post = posts.find(item => item.id === parseInt(post_id));

    const user = usersData.find(item => item.id === post?.userId);

    return NextResponse.json({
        ok: true,
        status: 200,
        post,
        user,
        comments,
    })
}