import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { useUserStore } from "./zustand/store";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("🚀 ~ middleware ~ user:", user);
  console.log("🚀 ~ middleware ~ req.nextUrl.pathname:", req.nextUrl.pathname);
  // if user is signed in and the current path is / redirect the user to /account
  if (
    (user && req.nextUrl.pathname === "/") ||
    (user && req.nextUrl.pathname === "/auth/login")
  ) {
    return NextResponse.redirect(new URL("/create", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/create", "/auth/login"],
};
