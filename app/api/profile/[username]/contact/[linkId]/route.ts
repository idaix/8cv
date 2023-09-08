import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { linkId: string; username: string } }
) {
  try {
    const body = await request.json();
    const { type, link } = body;
    if (!params.linkId) {
      return new NextResponse("Missing link id", { status: 403 });
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
    const contact = await prismadb.contact.update({
      where: {
        id: params.linkId,
        profileId: profile.username,
      },
      data: {
        type,
        link,
        profileId: profile.username,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("UPDATE_LINK_ERROR", error);
    return new NextResponse("UPDATE_LINK_ERROR", { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { linkId: string; username: string } }
) {
  try {
    if (!params.linkId) {
      return new NextResponse("Missing link id", { status: 403 });
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
    const contact = await prismadb.contact.delete({
      where: {
        id: params.linkId,
        profileId: profile.username,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("DELETE_LINK_ERROR", error);
    return new NextResponse("DELETE_LINK_ERROR", { status: 400 });
  }
}
