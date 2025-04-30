import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
    const token = request.cookies.get("auth_token")?.value;
    const isLoggedIn = !!token;
    const isAuthPage = request.nextUrl.pathname.startsWith("/login");
    const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isLoggedIn && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const cfg = {
    matcher: ["/login", "/dashboard/:path*"],
};
