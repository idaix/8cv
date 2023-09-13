import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { projectId: string; username: string } }
) {
  try {
    const body = await request.json();
    const { title, year, link, client, description, images } = body;

    if (!params.projectId) {
      return new NextResponse("Missing project id", { status: 403 });
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

    // First we update to delete all images
    await prismadb.project.update({
      where: {
        id: params.projectId,
        profileId: profile.username,
      },
      data: {
        title,
        year,
        client,
        description,
        link,
        profileId: profile.username,
        images: {
          deleteMany: {},
        },
      },
    });
    // Then we'll add all images again + new one
    const project = await prismadb.project.update({
      where: {
        id: params.projectId,
        profileId: profile.username,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("UPDATE_PROJECT_ERROR", error);
    return new NextResponse("UPDATE_PROJECT_ERROR", { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string; username: string } }
) {
  try {
    if (!params.projectId) {
      return new NextResponse("Missing project id", { status: 403 });
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

    const project = await prismadb.project.delete({
      where: {
        id: params.projectId,
        profileId: profile.username,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("DELETE_PROJECT_ERROR", error);
    return new NextResponse("DELETE_PROJECT_ERROR", { status: 400 });
  }
}
