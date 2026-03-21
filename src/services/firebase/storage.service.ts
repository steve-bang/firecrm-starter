"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { firebaseStorage } from "@/services/firebase/client";

export async function uploadProfileAvatar(file: File, userId: string) {
  if (!firebaseStorage) {
    // Keep local preview support working even before Firebase is configured.
    return {
      url: URL.createObjectURL(file),
      isMock: true,
    };
  }

  const fileRef = ref(firebaseStorage, `users/${userId}/avatar/${file.name}`);
  await uploadBytes(fileRef, file);

  return {
    url: await getDownloadURL(fileRef),
    isMock: false,
  };
}
