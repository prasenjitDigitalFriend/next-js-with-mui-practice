import { NextResponse } from "next/server";

export function middleware(request) {
    if (request.nextUrl.pathname != "/admin/login") {
        // return NextResponse.redirect(new URL("/admin/login", request.url))
    }
}

export const config = {
    matcher: "/admin/:path*"
}