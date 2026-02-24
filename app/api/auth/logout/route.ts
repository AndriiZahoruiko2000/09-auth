import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { globalServerAPI } from "../../api";

export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  try {
    const response = await globalServerAPI.post("/auth/logout", null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  return NextResponse.json({
    success: true,
  });
};
