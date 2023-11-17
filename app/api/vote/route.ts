import { APIErrorInterface } from "@/interfaces/api-error";
import { detaInsert } from "@/lib/deta";

export async function POST(request: Request) {
  try {
    const { niu, vote } = await request.json();
    const response = await detaInsert({
      baseName: "votes",
      payload: JSON.stringify({
        item: { key: niu, niu, vote },
      }),
    });

    if (!response.ok) {
      throw <APIErrorInterface>{
        status: response.status,
        statusText: response.statusText,
      };
    }

    return new Response("OK");
  } catch (e) {
    const { status, statusText } = e as APIErrorInterface;
    return new Response(statusText, {
      status,
      statusText,
    });
  }
}
