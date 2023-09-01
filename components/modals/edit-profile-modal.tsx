"use client";

import PageModal from "@/components/ui/page-modal";
import { useProfileModal } from "@/hooks/use-profile-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import tabs content
import General from "./partials/profile-general";
import Projects from "./partials/profile-projects";
import Contact from "./partials/profile-contact";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};
const tabs: Tab[] = [
  {
    id: "general",
    label: "General",
    content: <General />,
  },
  {
    id: "projects",
    label: "Projects",
    content: <Projects />,
  },
  {
    id: "contact",
    label: "Contact",
    content: <Contact />,
  },
];

const ProfileModal = () => {
  const profileModal = useProfileModal();
  return (
    <PageModal isOpen={profileModal.isOpen} onClose={profileModal.onClose}>
      <div className="h-[80vh]">
        <Tabs defaultValue="general" className="h-full grid grid-cols-4">
          <TabsList className="col-span-1 h-full flex-col justify-start bg-transparent pl-0 pr-5 border-r">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                className="justify-start w-full data-[state=active]:bg-muted"
                value={tab.id}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="col-span-3 pl-5">
            {tabs.map((tab) => (
              <TabsContent className="h-full" key={tab.id} value={tab.id}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </PageModal>
  );
};

export default ProfileModal;
