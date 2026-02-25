import { NextRequest, NextResponse } from "next/server";
import { globalServerAPI } from "../api";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const response = await globalServerAPI.get("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return NextResponse.json(response.data);
};

export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const body = await req.json();
  const response = await globalServerAPI.post("/notes", body, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return NextResponse.json(response.data);
};
