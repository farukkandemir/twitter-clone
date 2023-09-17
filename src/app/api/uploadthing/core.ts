import { authOptions } from "@/lib/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const session = await getServerSession(authOptions);

      // If you throw, the user will not be able to upload
      if (!session?.user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userEmail: session.user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      if (!metadata.userEmail) throw new Error("No user email");

      // await prisma.user.update({
      //   where: { email: metadata.userEmail! },
      //   data: {
      //     profileImage: file.url,
      //   },
      // });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
