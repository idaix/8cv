"use client";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useState } from "react";
const AuthModal = () => {
  const authModal = useAuthModal();
  const [loading, setLoading] = useState(false);
  const title =
    authModal.type == "LOGIN"
      ? "Login to your account 👋"
      : "Create a new profile ✨";
  const description =
    "By continuing you agree to our terms of service and privacy policy.";

  const handleAction = () => {
    setLoading(true);
    signIn("google");
    setLoading(false);
  };
  return (
    <Modal
      isOpen={authModal.isOpen}
      onClose={authModal.onClose}
      title={title}
      description={description}
    >
      <Button onClick={handleAction} disabled={loading}>
        Continue with google
      </Button>
      <Button variant="ghost" onClick={() => ""} disabled>
        Continue with email
      </Button>
    </Modal>
  );
};

export default AuthModal;
