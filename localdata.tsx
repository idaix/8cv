import { Contact, Project } from "@prisma/client";
export const links: Contact[] = [
  {
    id: "111",
    profileId: "x",
    link: "https://github.com/daishek",
    type: "Github",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "215",
    profileId: "x",
    link: "https://facebook.com/daichekkal",
    type: "Facebook",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "214855",
    profileId: "x",
    link: "https://twitter.com/daixek",
    type: "Twitter",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const projects: Project[] = [
  {
    id: "111",
    profileId: "x",
    title: "Job portal",
    description:
      "A platform where you can advertise jobs and search for resumes",
    year: 2022,
    client: "",
    link: "#",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "458",
    profileId: "x",
    title: "Autorent",
    description:
      "Autorent is an Algerian car rental platform. This platform is the link between Agencies and the client. It helps Agencies to manage the car business and the clients to book vehicles according to their requirements and needs and inquiry about new cars. Both the client and the Agency administrator(s) have different rights from their perspectives as well as different credentials. Autorent was made by 3 students from Mohamed El Bachir El Ibrahimi University of Bordj Bou Arréridj El-Anasser as a final undergraduate project.",
    year: 2022,
    client: "",
    link: "#",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
