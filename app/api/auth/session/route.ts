import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/lib/api/logErrorResponse";

export const GET = async () => {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken");
    const refreshToken = cookiesStore.get("refreshToken");
    if (accessToken) {
      return NextResponse.json({
        success: true,
      });
    }

    if (!refreshToken) {
      return NextResponse.json({
        success: false,
      });
    }

    const response = await api.get("/auth/session", {
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    const setCookies = response.headers["set-cookie"];
    if (!setCookies) return NextResponse.json({ success: false });

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
    return NextResponse.json({ success: true });
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
