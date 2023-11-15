"use server";

import { cookies } from "next/headers";

export async function deleteCoookie(name: string) {
  cookies().delete(name);
}
