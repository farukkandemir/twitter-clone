// "use server";

// import { authOptions } from "@/lib/auth";
// import prisma from "@/utils/db";
// import { getServerSession } from "next-auth";

// export const saveUsernameToDb = async (data: FormData) => {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) throw new Error("No user email found");
//   if (!data) throw new Error("No username found");

//   const userName = data.get("username") as string;

//   await prisma.user.update({
//     where: {
//       email: session?.user?.email,
//     },
//     data: {
//       username: userName,
//     },
//   });
// };
