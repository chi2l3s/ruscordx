import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
  try {
      const { userId } = auth();
      if (!userId) throw new Error('Unauthorized');
      return { userId: userId };
  } catch (error) {
      console.error('Authentication error:', error);
      throw error; // Continue to throw the error to avoid proceeding without authentication.
  }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => {
      try {
        return handleAuth();
      } catch (error) {
        console.error('Upload Middleware Error:', error);
        throw new UploadThingError('Unauthorized');
      }
    })
    .onUploadComplete((res) => {
      console.log('Upload complete:', res);
    }),
  messageFile: f(['image', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
