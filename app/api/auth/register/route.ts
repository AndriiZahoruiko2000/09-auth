import { NextRequest, NextResponse } from "next/server";
import { ApiError, api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";

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
