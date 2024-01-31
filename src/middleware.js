import { NextResponse } from "next/server";

export function middleware(request) {
    let cookie = request.cookies.get("sessionData")?.value;
    
    if (request.nextUrl.pathname != "/admin/login") {
        if (typeof cookie === "undefined") {
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }
    }
}

export const config = {
    matcher: "/admin/:path*"
} 