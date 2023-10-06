"use client";

import Modal from "@/components/ui/modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useJobModal } from "@/hooks/use-job-modal";
import JobForm from "./components/job-form";
const JobModal = () => {
  const jobModal = useJobModal();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  // if (status === "unauthenticated") return null;

  return (
    <Modal
      isOpen={jobModal.isOpen}
      onClose={jobModal.onClose}
      title="Create a new role"
    >
      <JobForm />
    </Modal>
  );
};

export default JobModal;
