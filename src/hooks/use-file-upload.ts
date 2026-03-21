"use client";

import { useState } from "react";

import { uploadProfileAvatar } from "@/services/firebase/storage.service";

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadAvatar(file: File, userId: string) {
    setIsUploading(true);
    setError(null);

    try {
      return await uploadProfileAvatar(file, userId);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload file.";
      setError(message);
      throw uploadError;
    } finally {
      setIsUploading(false);
    }
  }

  return {
    uploadAvatar,
    isUploading,
    error,
  };
}
