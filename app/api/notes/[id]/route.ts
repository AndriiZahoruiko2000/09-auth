import { NextRequest, NextResponse } from "next/server";
import { ApiError, api } from "../../api";
import { cookies } from "next/headers";

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
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      { status: err.status },
    );
  }
};

export const PATCH = async (req: NextRequest, { params }: GetProps) => {
  try {
    const cookieStore = await cookies();
    const body = req.json();
    const { id } = await params;
    const response = await api.patch(`/notes/${id}`, body, {
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
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      { status: err.status },
    );
  }
};
