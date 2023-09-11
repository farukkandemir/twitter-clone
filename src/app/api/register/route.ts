import { SignUpSchema } from "@/lib/types";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const result = SignUpSchema.safeParse(body);

  if (!result.success) {
    // const errors = result.error.flatten((issue: ZodIssue) => ({
    //   message: issue.message,
    //   errorCode: issue.code,
    // }));

    // console.log(errors);

    return NextResponse.json({
      success: false,
      // errors: result.error.flatten(),
    });
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({
      success: false,
      error: { message: "Email already exists" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true });
}
