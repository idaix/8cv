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

    const recentlyViewed = await prismadb.profileViwes.findMany({
      where: {
        visitor: params.username,
      },
      select: {
        Owner: true,
      },
      distinct: ["owner"],
      take: 3,
    });

    return NextResponse.json(recentlyViewed);
  } catch (error) {
    console.log("Recently_Viewed_Profiles_Errors: ", error);
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
