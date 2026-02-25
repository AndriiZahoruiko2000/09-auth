import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/lib/api/logErrorResponse";

export const POST = async (req: NextRequest) => {
  console.log("HELLO REGISTER");

  try {
    const body = await req.json();
    const response = await api.post("/auth/register", body);

    const cookiesStore = await cookies();
    const setCookies = response.headers["set-cookie"];
    if (!setCookies)
      return NextResponse.json("smth going wrong", {
        status: 401,
      });

    const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];

    for (const item of cookieArray) {
      const parsedItem = parse(item);
      const options = {
        expires: parsedItem.Expires ? new Date(parsedItem.Expires) : undefined,
        path: parsedItem.Path,
        maxAge: Number(parsedItem["Max-Age"]),
      };

      if (parsedItem.refreshToken) {
        cookiesStore.set("refreshToken", parsedItem.refreshToken, options);
      }

      if (parsedItem.accessToken) {
        cookiesStore.set("accessToken", parsedItem.accessToken, options);
      }
    }
    return NextResponse.json(response.data, { status: response.status });
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
