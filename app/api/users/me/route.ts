import { cookies } from "next/headers";
import { globalServerAPI } from "../../api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = await cookies();
  const response = await globalServerAPI.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return NextResponse.json(response.data);
};

export const PATCH = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();

    const body = await req.json();
    console.log(body);

    const response = await globalServerAPI.patch("/users/me", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    console.log(response);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
