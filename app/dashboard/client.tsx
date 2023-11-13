"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RandomString from "randomstring";
import { useState } from "react";

export default function DashboardClient() {
  const [data, setData] = useState(
    "L0122142,Rizal Dwi Anggoro;L0122143,Yafi Okta Wibowo;"
  );

  const upload = () => {
    const students = data.split(";");
    students.forEach(async (student) => {
      if (student.trim().length > 0) {
        const fields = student.trim().split(",");
        const nim = fields[0];
        const name = fields[1];
        const accessCode = RandomString.generate({
          length: 8,
          capitalization: "lowercase",
        });

        console.log({
          nim,
          name,
          accessCode,
        });

        const response = await fetch("/api/dashboard/voter", {
          method: "POST",
          body: JSON.stringify({
            nim,
            name,
            accessCode,
          }),
        });

        const { status, statusText } = response;
        console.log({ status, statusText });

        if (response.ok) {
          console.log("success upload voter: " + name);
        }
      }
    });
  };

  return (
    <>
      <div>
        {/* left */}
        <div></div>

        {/* right */}
        <div></div>
      </div>
      <Textarea
        placeholder="Masukkan data mahasiswa"
        value={data}
        onChange={(event) => setData(event.target.value)}
      ></Textarea>

      <Button onClick={() => upload()}>Upload</Button>
    </>
  );
}
