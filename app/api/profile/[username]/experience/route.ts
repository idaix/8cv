import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const body = await request.json();
    const { title, fromYear, toYear, company, description, location } = body;

    if (!params.username || !fromYear || !toYear) {
      return new NextResponse("Missing fields!", {
        status: 400,
      });
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthenticated, authentication required!", {
        status: 400,
      });
    }

    const profile = await prismadb.profile.findFirst({
      where: {
        username: params.username,
        userId: currentUser.id,
      },
    });
    if (!profile) {
      return new NextResponse("No profile found with this informations", {
        status: 400,
      });
    }

    const experience = await prismadb.experience.create({
      data: {
        title,
        location,
        fromYear,
        toYear,
        company,
        description,
        profileId: profile.username,
      },
    });
    return NextResponse.json(experience);
  } catch (error) {
    return new NextResponse("Something went wrong");
  }
}
