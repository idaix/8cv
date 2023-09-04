import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      username: string;
    };
  }
) {
  try {
    if (!params.username) {
      return new NextResponse("Username required", { status: 400 });
    }

    const profile = await prismadb.profile.findFirst({
      where: {
        username: params.username,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log("RETRIEV_PROFILE_ERROR: ", error);
    return new NextResponse("CHECK_USERNAME_VALIDATION_ERROR", { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const body = await request.json();
    const {
      username,
      displayName,
      headline,
      about,
      location,
      website,
      imageURL,
    } = body;

    if (
      !(body?.username && typeof body?.username == "string") &&
      !params.username
    ) {
      return new NextResponse("missing username!", { status: 400 });
    }

    // check authorization
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthenticated, authentication required!", {
        status: 400,
      });
    }

    const updatedProfile = await prismadb.profile.updateMany({
      where: {
        userId: currentUser.id,
        username: params.username,
      },
      data: {
        username,
        name: displayName,
        headline,
        about,
        location,
        website,
        image: imageURL,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log("UPDATE_PROFILE_ERROR:", error);
    return new NextResponse("Something went wrong!", { status: 400 });
  }
}
