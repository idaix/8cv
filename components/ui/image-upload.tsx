"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  value,
  onChange,
  onRemove,
}) => {
  // -----------------------
  // handle hydration
  // -----------------------
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;
  return (
    <div className="flex flex-wrap gap-5">
      {value.map((url) => (
        <div key={url} className="relative w-[100px] h-[100px]">
          <div className="absolute top-1 right-1 z-10">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove(url)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <Image src={url} alt="Image" fill className="object-cover" />
        </div>
      ))}

      <CldUploadWidget onUpload={onUpload} uploadPreset="s0ngnd2n">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              disabled={disabled}
              type="button"
              onClick={onClick}
              size="sm"
              variant="secondary"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
