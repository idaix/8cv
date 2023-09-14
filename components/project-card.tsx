"use client";

import { Project, ProjectImage } from "@prisma/client";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { ReactElement, useState } from "react";
import ProjectForm from "./modals/components/project-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IProps {
  project: Project & {
    images: ProjectImage[];
  };
  allowEdit?: boolean;
  setOpenForm?: (value: boolean) => void;
  setForm?: (value: ReactElement) => void;
}
const ProjectCard: React.FC<IProps> = ({
  project,
  allowEdit,
  setForm,
  setOpenForm,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `api/profile/${project.profileId}/project/${project.id}`
      );
      toast({
        title: "Successfully deleted",
      });
      router.refresh();
    } catch (error) {
      console.error("DELETE_PROJECT_ERROR", error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateClick = () => {
    if (setForm && setOpenForm && allowEdit) {
      setForm(<ProjectForm initialData={project} />);
      setOpenForm(true);
    } else {
      return null;
    }
  };

  return (
    <div className="text-sm grid grid-cols-4">
      <div className="col-span-4 sm:col-span-1 text-muted-foreground">
        {project.year}
      </div>
      <div className="col-span-4 sm:col-span-3">
        {/* title */}
        {project.link ? (
          <Link
            href={project.link}
            target="_blank"
            className="flex items-center hover:underline"
          >
            {project.title}
            <MoveUpRightIcon className="h-3 w-3" />
          </Link>
        ) : (
          <p>{project.title}</p>
        )}
        {/* description */}
        <p className="whitespace-pre-line text-muted-foreground mt-1 text-sm">
          {project.description}
        </p>
        {/* images */}

        {project.images.length > 0 && (
          <div className="mt-2 flex flex-col flex-wrap gap-2">
            {project.images.map((image) => (
              <div
                key={image.url}
                className="w-fit h-[100px] relative rounded-md overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={false}
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {allowEdit && (
        <div className="mt-1 col-span-4 sm:col-span-3 sm:col-start-2 flex items-center gap-x-4">
          <Button
            onClick={handleUpdateClick}
            disabled={loading}
            variant="link"
            className="text-primary/40 transition hover:text-primary/75 text-xs h-auto p-0 decoration-transparent font-light"
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            variant="link"
            className="text-primary/40 transition hover:text-primary/75 text-xs h-auto p-0 decoration-transparent font-light"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
