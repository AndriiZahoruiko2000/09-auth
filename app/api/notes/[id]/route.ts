import { NextRequest, NextResponse } from "next/server";
import { ApiError, api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/lib/api/logErrorResponse";

interface GetProps {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: GetProps) => {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const response = await api.get(`/notes/${id}`, {
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

export const PATCH = async (req: NextRequest, { params }: GetProps) => {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    const { id } = await params;
    const response = await api.patch(`/notes/${id}`, body, {
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

export const DELETE = async (req: NextRequest, { params }: GetProps) => {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const response = await api.delete(`/notes/${id}`, {
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
