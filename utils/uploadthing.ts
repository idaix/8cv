// --------------------------------------------------------
// From Uploadthing docs (https://docs.uploadthing.com/nextjs/appdir)
// --------------------------------------------------------

import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
