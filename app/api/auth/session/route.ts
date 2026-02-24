import { cookies } from "next/headers";
import { globalServerAPI } from "../../api";
import { NextResponse } from "next/server";
import { parse } from "cookie";

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

    const response = await globalServerAPI.get("/auth/session", {
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    const setCookies = response.headers["set-cookie"];
    if (!setCookies)
      return NextResponse.json("smth going wrong", {
        status: 400,
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
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
};
