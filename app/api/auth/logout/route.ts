import { cookies } from "next/headers";

export async function GET() {
  console.log("logout called");

  cookies().delete("voter-token");

  // const cookie = serialize("voter-token", "", {
  //   maxAge: -1,
  //   path: "/",
  //   httpOnly: true,
  // });

  return new Response("OK");
}
