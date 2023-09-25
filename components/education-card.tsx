"use client";

import axios from "axios";
import { Education } from "@prisma/client";
import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import EducationForm from "./modals/components/education-form";

interface IProps {
  // --- data - used in all cases ---
  data: Education;
  // --- for editing ---
  // allowEdit is used to show the "edit bar"
  allowEdit?: boolean;
  // used for updating send initaldata to create/update form
  setOpenForm?: (value: boolean) => void;
  setForm?: (value: ReactElement) => void;
}
const EducationCard: React.FC<IProps> = ({
  data,
  allowEdit,
  setForm,
  setOpenForm,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`api/profile/${data.profileId}/education/${data.id}`);
      toast({
        title: "Successfully deleted",
      });
      router.refresh();
    } catch (error) {
      console.error("DELETE_EDUCATION_ERROR", error);
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
      setForm(<EducationForm initialData={data} />);
      setOpenForm(true);
    } else {
      return null;
    }
  };

  return (
    <div className="text-sm grid grid-cols-4">
      {/* --- left side --- */}
      <div className="col-span-4 sm:col-span-1 text-muted-foreground">
        {data.fromYear} — {data.toYear}
      </div>

      {/* --- right side --- */}
      <div className="col-span-4 sm:col-span-3">
        {/* <title> at <university> */}
        <p>
          {data.title &&
            `${data.title} ${data.university && `at ${data.university}`}`}
        </p>
        <p className="text-muted-foreground text-sm">{data.location}</p>
        {/* description */}
        <p className="whitespace-pre-line text-muted-foreground text-sm mt-3">
          {data.description}
        </p>
      </div>

      {/* --- edit section ---  */}
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

export default EducationCard;
