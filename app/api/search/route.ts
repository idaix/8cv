import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: q ?? "",
              mode: "insensitive",
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
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
