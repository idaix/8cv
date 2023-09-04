import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const body = await request.json();
    const { type, link } = body;
    if (!params.username || !type || !link) {
      return new NextResponse("Missing fields id are required!", {
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
    const contact = await prismadb.contact.create({
      data: {
        type,
        link,
        profileId: profile.username,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("ERROR_WHENE_CREATING_PROJECT", error);
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
