"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function HomeClient() {
  const [voter, setVoter] = useState({
    nim: "L0122142",
    accessCode: "mimqkomm",
  });

  const login = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        nim: voter.nim,
        accessCode: voter.accessCode,
      }),
    });

    if (response.ok) {
      console.log("success");
    } else {
      console.log("failed");
    }
  };

  return (
    <>
      <div className="max-w-[512px] mx-auto px-4">
        <p className="font-semibold text-4xl mt-8">
          Pemilihan Ketua dan Wakil Ketua Himpunan Teknik Industri UGM
        </p>
        <Input
          className="mt-8"
          value={voter.nim}
          onChange={(event) =>
            setVoter({
              ...voter,
              nim: event.target.value,
            })
          }
          type="text"
          placeholder="Nomor Induk Mahasiswa"
        />
        <Input
          className="mt-2"
          value={voter.accessCode}
          onChange={(event) =>
            setVoter({
              ...voter,
              accessCode: event.target.value,
            })
          }
          type="password"
          placeholder="Kode Akses"
        />

        <Button className="mt-8" onClick={() => login()}>
          Masuk
        </Button>
      </div>
    </>
  );
}
