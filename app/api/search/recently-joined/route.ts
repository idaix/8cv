import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";

// emm soo the logic is to retrieve recently joind in the last 7 days
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(new Date().getDate() - 6); // minus one day because we want to include today's date too,

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit");

    // retrive username of the current user
    // if user exist do not return current user
    const currentUser = await getCurrentUser();
    if (currentUser?.id) {
      const currentProfile = await prismadb.profile.findUnique({
        where: {
          userId: currentUser?.id,
        },
      });
      const profiles = await prismadb.profile.findMany({
        where: {
          NOT: {
            username: currentProfile?.username ?? "",
          },
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: parseInt(limit as string) || undefined,
      });
      return NextResponse.json(profiles);
    } else {
      const profiles = await prismadb.profile.findMany({
        where: {
          createdAt: sevenDaysAgo,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: parseInt(limit as string) || undefined,
      });
      return NextResponse.json(profiles);
    }
  } catch (error) {
    console.error("SEARCH_ERROR", error);
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
