import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//
import { generateUrl } from "@/utils/string";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/chat"];
  const guestRoutes = ["/"];

  const token = request.cookies.get("token")?.value;

  let isAuthenticated = false;
  if (token) {
    const response = await fetch(generateUrl("/protected/user/me"), {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (response.status === 200) {
      isAuthenticated = true;
    }
  }

  const isGuestRoute = guestRoutes.includes(request.nextUrl.pathname);
  if (isGuestRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(protectedRoutes[0], request.url));
  }

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(guestRoutes[0], request.url));
  }
}
