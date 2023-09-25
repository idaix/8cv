import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { educationId: string; username: string } }
) {
  try {
    const body = await request.json();
    const { title, fromYear, toYear, university, description, location } = body;

    if (!params.educationId) {
      return new NextResponse("Missing education id", { status: 403 });
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

    const education = await prismadb.education.update({
      where: {
        id: params.educationId,
        profileId: profile.username,
      },
      data: {
        title,
        location,
        fromYear,
        toYear,
        university,
        description,
        profileId: profile.username,
      },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error("UPDATE_EDUCATION_ERROR", error);
    return new NextResponse("Something went wrong!", { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { educationId: string; username: string } }
) {
  try {
    if (!params.educationId) {
      return new NextResponse("Missing education id", { status: 403 });
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

    const education = await prismadb.education.delete({
      where: {
        id: params.educationId,
        profileId: profile.username,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("DELETE_EDUCATION_ERROR", error);
    return new NextResponse("Something went wrong!", { status: 400 });
  }
}
