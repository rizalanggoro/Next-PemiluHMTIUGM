import { detaGet } from "@/lib/deta";
import { tokenGenerate } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { nim, accessCode } = await request.json();

  try {
    const response = await detaGet({ baseName: "voter", key: nim });
    if (!response.ok) throw { message: response.statusText };

    const json = await response.json();
    if (json.accessCode != accessCode) throw { message: "Invalid access code" };

    const token = await tokenGenerate(json);
    cookies().set("login-token", token);

    return new Response("OK");
  } catch (e) {
    const { message } = e as any;
    return new Response(message, {
      status: 500,
      statusText: message,
    });
  }
}