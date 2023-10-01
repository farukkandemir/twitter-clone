"use client";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState } from "react";

export default function UploadButtonComponent({
  setProfilePicture,
}: {
  setProfilePicture?: (url: string) => void;
}) {
  const [image, setImage] = useState<string | null>(null);

  return (
    <main>
      <Image
        src={`${image ? image : "/images/placeholder.png"}`}
        width={200}
        height={200}
        alt="placeholder"
        style={{
          borderRadius: "9999px",
          objectFit: "cover",
        }}
      />

      <div className="pt-4">
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button: "bg-mainBlue text-sm w-fit px-4",
          }}
          onClientUploadComplete={(res) => {
            if (!res) return toast.error("Upload failed!");
            setImage(res[0].url as string);
            setProfilePicture && setProfilePicture(res[0].url as string);
            toast.success("Uploaded successfully!");
          }}
          onUploadError={(error: Error) => {
            toast.error(error.message);
          }}
        />
      </div>
    </main>
  );
}
