import { authOptions } from "@/lib/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";

export const useCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    select: {
      id: true,
      name: true,
      profileImage: true,
      username: true,
    },
  });

  return user;
};
