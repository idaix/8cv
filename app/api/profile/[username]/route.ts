import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, params: { username: string }) {
  try {
    if (!params.username) {
      return new NextResponse("Username required", { status: 400 });
    }
    console.log("chek username");

    const username = await prismadb.profile.findFirst({
      where: {
        username: params.username,
      },
    });

    if (username) {
      return NextResponse.json({ isValid: false });
    } else {
      return NextResponse.json({ isValid: true });
    }
  } catch (error) {
    console.log("CHECK_USERNAME_VALIDATION_ERROR: ", error);
    return new NextResponse("CHECK_USERNAME_VALIDATION_ERROR", { status: 400 });
  }
}
