import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const body = await request.json();
    const { jobTitle, link, description, type, location, keywords } = body;
    if (!params.username || !jobTitle || !link) {
      return new NextResponse("Required fields are missing!", {
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

    const job = await prismadb.job.create({
      data: {
        jobTitle,
        link,
        description,
        keywords,
        location,
        profileId: profile.username,
        type,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("JOB_CREATION_ERROR", error);

    return new NextResponse("Something went wrong");
  }
}
