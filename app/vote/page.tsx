import { tokenVerify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import VoteClient from "./client";

export default async function Page() {
  const voterToken = cookies().get("voter-token");
  if (!voterToken) return notFound();

  const token = await tokenVerify(voterToken.value);

  return (
    <>
      <VoteClient token={token} />
    </>
  );
}
