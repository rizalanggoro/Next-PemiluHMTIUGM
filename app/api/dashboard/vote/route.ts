import { detaQuery } from "@/lib/deta";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const lastkey = request.nextUrl.searchParams.get("lastkey");
  return await detaQuery({
    baseName: "votes",
    payload: JSON.stringify({
      query: [],
      limit: 100,
      last: lastkey,
    }),
  });
}
