"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function DashboardVoterUploadClient() {
  const [data, setData] = useState("");
  return (
    <>
      <p>Unggah Data Pemilih</p>

      <Textarea
        value={data}
        onChange={(event) => setData(event.target.value)}
      ></Textarea>
    </>
  );
}
