import { detaInsert, detaQuery } from "@/lib/deta";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    const { niu, name, accessCode } = await request.json();

    const response = await detaInsert({
      baseName: "voter",
      payload: JSON.stringify({
        item: {
          key: `${niu}`,
          name,
          accessCode,
          niu,
        },
      }),
    });

    if (!response.ok) {
      throw { message: response.statusText };
    }

    return response;
  } catch (e) {
    const { message } = e as any;
    return new Response(message, {
      status: 500,
      statusText: message,
    });
  }
}

export async function GET(request: NextRequest) {
  const lastkey = request.nextUrl.searchParams.get("lastkey");

  try {
    const response = await detaQuery({
      baseName: "voter",
      payload: JSON.stringify({
        query: [],
        limit: 100,
        last: lastkey,
      }),
    });

    if (!response.ok) {
      throw { message: response.statusText };
    }

    return response;
  } catch (e) {
    const { message } = e as any;
    return new Response(message, {
      status: 500,
      statusText: message,
    });
  }
}
