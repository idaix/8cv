"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { toast } from "./use-toast";

interface PageModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PageModal: React.FC<PageModalProps> = ({ children, isOpen, onClose }) => {
  //   const { data: session, status } = useSession();
  //   if (status === "unauthenticated") {
  //     return null;
  //   }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="max-w-5xl">{children}</DialogContent>
    </Dialog>
  );
};

export default PageModal;
