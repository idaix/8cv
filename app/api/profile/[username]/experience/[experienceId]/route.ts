import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { experienceId: string; username: string } }
) {
  try {
    const body = await request.json();
    const { title, fromYear, toYear, company, description, location } = body;

    if (!params.experienceId) {
      return new NextResponse("Missing experience id", { status: 403 });
    }
    if (!params.username) {
      return new NextResponse("Missing username", { status: 403 });
    }
    // check authorization (same user who made the request === owner of this project)
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
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

    const experience = await prismadb.experience.update({
      where: {
        id: params.experienceId,
        profileId: profile.username,
      },
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
    console.error("UPDATE_EXPERIENCE_ERROR", error);
    return new NextResponse("Something went wrong!", { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { experienceId: string; username: string } }
) {
  try {
    if (!params.experienceId) {
      return new NextResponse("Missing experience id", { status: 403 });
    }
    if (!params.username) {
      return new NextResponse("Missing username", { status: 403 });
    }

    // check authorization (same user who made the request === owner of this project)
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
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

    const experience = await prismadb.experience.delete({
      where: {
        id: params.experienceId,
        profileId: profile.username,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("DELETE_EXPERIENCE_ERROR", error);
    return new NextResponse("Something went wrong!", { status: 400 });
  }
}
