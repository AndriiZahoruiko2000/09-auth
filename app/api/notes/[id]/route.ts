import { NextRequest, NextResponse } from "next/server";
import { globalServerAPI } from "../../api";
import { cookies } from "next/headers";

interface GetProps {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: GetProps) => {
  const cookieStore = await cookies();
  const { id } = await params;
  const response = await globalServerAPI.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return NextResponse.json(response.data);
};

export const PATCH = async (req: NextRequest, { params }: GetProps) => {
  const cookieStore = await cookies();
  const body = req.json();
  const { id } = await params;
  const response = await globalServerAPI.patch(`/notes/${id}`, body, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return NextResponse.json(response.data);
};

export const DELETE = async (req: NextRequest, { params }: GetProps) => {
  const cookieStore = await cookies();
  const { id } = await params;
  const response = await globalServerAPI.delete(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return NextResponse.json(response.data);
};
