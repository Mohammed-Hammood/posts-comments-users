import { NextResponse } from "next/server";
import users from "./data.json";

export async function GET() {
    return NextResponse.json({
        ok: true,
        status: 200,
        users_count: users.length,
        users,
    })
}