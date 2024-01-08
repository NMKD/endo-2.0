import { getCurrentUser } from "@/lib/prisma.services";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const response = await getCurrentUser(body.id);
    if (response) {
      return NextResponse.json({ user: response });
    } else {
      return NextResponse.json({ message: "Do not faund user" });
    }
  } catch (err) {
    return NextResponse.json({ message: "Internal server error" });
  }
}
