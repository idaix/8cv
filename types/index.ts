import { Profile, Project } from "@prisma/client";

export type Feed = Project & { profile: Profile };
