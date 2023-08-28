import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    // get authenticated user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthenticated, authentication required!", {
        status: 400,
      });
    }
    // check for profile

    const profile = await prismadb.profile.findUnique({
      where: {
        userId: currentUser.id,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 400 });
  }
}
