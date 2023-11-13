import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { tokenVerify } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/vote") {
    try {
      const loginSession = cookies().get("login-session");
      console.log({ loginSession });
      if (!loginSession) throw "middleware: login session not found!";

      const { payload } = await tokenVerify(loginSession.value);
      console.log(payload);

      return NextResponse.next();
    } catch (e) {
      console.log({ e });
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.next();
  }

  return NextResponse.next();
}
