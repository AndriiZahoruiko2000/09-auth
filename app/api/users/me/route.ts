import { cookies } from "next/headers";
import { globalServerAPI } from "../../api";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = await cookies();
  const response = await globalServerAPI.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return NextResponse.json(response.data);
};
