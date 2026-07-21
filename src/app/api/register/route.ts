import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      company,
      email,
      password,
    } = body;

    // Validation
    if (!name || !company || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already registered",
        },
        {
          status: 400,
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create recruiter
    const user = await prisma.user.create({
        data: {
        name,
        company,
        email,
        password: hashedPassword,
        role: "RECRUITER",
        },
    });

    return NextResponse.json({
      success: true,
      message: "Recruiter registered successfully",
      user,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}