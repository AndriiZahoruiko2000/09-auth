import { cookies } from "next/headers";
import { api } from "../../api";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/lib/api/logErrorResponse";
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
    if (isAxiosError(error)) {
      logErrorResponse(error);

      return NextResponse.json(
        {
          error:
            (error.response?.data as any)?.error ??
            (error.response?.data as any)?.message ??
            error.message,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();

    const body = await req.json();

    const response = await api.patch("/users/me", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    console.log(response);

    return NextResponse.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);

      return NextResponse.json(
        {
          error:
            (error.response?.data as any)?.error ??
            (error.response?.data as any)?.message ??
            error.message,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
