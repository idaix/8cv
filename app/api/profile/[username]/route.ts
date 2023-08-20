import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      username: string;
    };
  }
) {
  try {
    if (!params.username) {
      return new NextResponse("Username required", { status: 400 });
    }

    const profile = await prismadb.profile.findFirst({
      where: {
        username: params.username,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log("RETRIEV_PROFILE_ERROR: ", error);
    return new NextResponse("CHECK_USERNAME_VALIDATION_ERROR", { status: 400 });
  }
}
