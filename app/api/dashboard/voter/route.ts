import { detaQuery } from "@/lib/deta";

export async function POST(request: Request) {}

export async function GET() {
  try {
    const response = await detaQuery({
      baseName: "voter",
      payload: JSON.stringify({}),
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
