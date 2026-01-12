import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  { path: "/admin", roles: ["ADMIN"] },
  { path: "/voucher", roles: ["MEMBER", "ADMIN"] },
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. User's Logic Structure
  const { pathname } = request.nextUrl;

  const imageExtensions = [
    ".webp",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
  ];
  const isImage = imageExtensions.some((ext) =>
    pathname.toLowerCase().endsWith(ext)
  );

  const publicPaths = [
    "/login",
    "/register",
    "/unauthorized",
    "/not-found",
    "/auth/error",
    "/underdevelopment",
    "/", // Root is public
  ];

  const protectedConfig = protectedPaths.find((config) =>
    pathname.startsWith(config.path)
  );

  const isPublicPath =
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    ) && !protectedConfig;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/cron") ||
    isImage ||
    isPublicPath
  ) {
    return response;
  }

  if (protectedConfig) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    const { data: userData, error } = await supabase
      .from("User")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || !userData) {
      console.error("Error fetching user role:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRole = userData.role;

    if (!protectedConfig.roles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return response;
}
