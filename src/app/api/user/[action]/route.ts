import prisma from "@/utils/db";
import { NextResponse } from "next/server";

const createUserName = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        username: `@${username}`,
      },
    });

    return {
      success: true,
      message: "Username created",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating username",
    };
  }
};

const checkUsername = async ({ username }: { username: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

export async function POST(
  request: Request,
  { params }: { params: { action: string } }
) {
  const body = await request.json();

  const action = params.action;

  if (action === "new-username") {
    const result = await createUserName(body);
    return NextResponse.json(result);
  }
  if (action === "check-username") {
    const result = await checkUsername(body);
    return NextResponse.json(result);
  }
}
