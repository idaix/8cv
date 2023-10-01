import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;

    // handle not completi ng the process of profile creation
    // always return to welcome page to complete the process
    const isProfileCreated = false;
    const isNotWelcomePage = !req.nextUrl.pathname.startsWith("/welcome");
    if (isNotWelcomePage) {
      if (isAuth && !isProfileCreated) {
        return NextResponse.redirect(new URL("/welcome", req.url));
      }
      return null;
    }

    console.log("hello dai");
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/feed"],
};
