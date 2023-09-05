import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // for now our feed is based on the created projects
    // fetch all the projects, no rule needed
    // then we will add infinit scroll feature -NOT YET, but later *I PROMIS <3*-

    const allProjects = await prismadb.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("API_GET_FEED_ERROR", error);
    return new NextResponse("Somthing went wrong [GET_FEED_ERROR]", {
      status: 400,
    });
  }
}
