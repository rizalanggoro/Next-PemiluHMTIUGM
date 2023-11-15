import { APIErrorInterface } from "@/interfaces/api-error";
import { detaGet } from "@/lib/deta";
import { tokenGenerate } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { niu, accessCode } = await request.json();

  try {
    const response = await detaGet({ baseName: "voter", key: niu });
    if (!response.ok)
      throw <APIErrorInterface>{
        status: 404,
        statusText: "not found",
      };

    const json = await response.json();
    if (json.accessCode != accessCode)
      throw <APIErrorInterface>{
        status: 401,
        statusText: "unauthorized",
      };

    const token = await tokenGenerate(json);
    cookies().set("voter-token", token, {
      maxAge: 60 * 60,
      httpOnly: true,
    });

    return new Response("OK");

    // return new Response("OK", {
    //   headers: {
    //     "set-cookie": serialize("voter-token", token, {
    //       path: "/",
    //       httpOnly: true,
    //     }),
    //   },
    // });
  } catch (e) {
    const { status, statusText } = e as APIErrorInterface;
    return new Response(statusText, {
      status,
      statusText,
    });
  }
}
