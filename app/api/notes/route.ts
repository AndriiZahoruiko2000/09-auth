import { NextRequest, NextResponse } from "next/server";
import { ApiError, api } from "../api";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const response = await api.get("/notes", {
      params,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      { status: err.status },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    const response = await api.post("/notes", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      { status: err.status },
    );
  }
};
