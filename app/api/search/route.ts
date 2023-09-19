import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const order = url.searchParams.get("order");
    const limit = url.searchParams.get("limit");

    const profiles = await prismadb.profile.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q ?? "",
            },
          },
          {
            username: {
              contains: q ?? "",
            },
          },
        ],
      },
      orderBy: {
        createdAt: order === "asc" ? "asc" : "desc",
      },
      take: parseInt(limit as string) || undefined,
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("SEARCH_ERROR", error);
  }
};
