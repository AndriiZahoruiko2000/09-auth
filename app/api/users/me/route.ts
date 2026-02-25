import { cookies } from "next/headers";
import { ApiError, api } from "../../api";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const response = await api.get("/users/me", {
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

export const PATCH = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();

    const body = await req.json();
    console.log(body);

    const response = await api.patch("/users/me", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    console.log(response);

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
