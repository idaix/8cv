import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, displayName, userId } = body;
    if (!username || !displayName || !userId) {
      return new NextResponse(
        "Username, display name and user id are required!",
        {
          status: 400,
        }
      );
    }
    const isExistUsername = await prismadb.profile.findFirst({
      where: {
        username: username,
      },
    });

    if (isExistUsername) {
      return new NextResponse("Username is taken", {
        status: 400,
      });
    }
    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("Invalid User", {
        status: 400,
      });
    }
    const profile = await prismadb.profile.create({
      data: {
        userId,
        username,
        name: displayName,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    return new NextResponse("Something went wrong");
  }
}
