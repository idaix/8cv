import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, dispalyName, userId } = body;
    if (!username || !dispalyName || userId) {
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
      return new NextResponse("username already exists", {
        status: 400,
      });
    }

    const profile = prismadb.profile.create({
      data: {
        userId,
        username,
        name: dispalyName,
        about: "",
        headline: "",
        location: "",
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    return new NextResponse("Something went wrong");
  }
}
