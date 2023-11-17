"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginErrorMessage {
  [key: number]: string;
}

export default function HomeClient() {
  const [voter, setVoter] = useState({
    niu: "523175",
    accessCode: "9ZO1NX",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const login = async () => {
    setErrorMessage("");
    setIsLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        niu: voter.niu,
        accessCode: voter.accessCode,
      }),
    });

    if (response.ok) {
      router.replace("/vote");
    } else {
      const { status } = response;
      const messages: LoginErrorMessage = {
        404: "Akun dengan NIU tersebut tidak ditemukan!",
        401: "Kode akses yang Anda masukkan tidak valid!",
        403: "Suara Anda telah digunakan sebelumnya!",
      };
      setErrorMessage(messages[status]);
    }
    setIsLoading(false);
  };

  const listLogo: Array<{ href: string }> = [
    { href: "./dpo-hmti.png" },
    { href: "./lambang-hmti.png" },
    { href: "./logo-kpu.png" },
  ];

  return (
    <>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        <div className="col-span-7 flex items-center">
          <div className="px-8 max-w-[768px] mx-auto w-full">
            <div className="flex gap-4 absolute top-0 my-8">
              {listLogo.map((item) => (
                <img src={item.href} className="h-8 object-contain" />
              ))}
            </div>
            <p className="font-bold text-5xl mt-8 leading-normal">
              Pemilu HMTI UGM <br />
              Periode 2024
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Masukkan NIU dan kode akses untuk melanjutkan
            </p>
            <div className="max-w-[512px]">
              <Input
                className="mt-8 w-full"
                value={voter.niu}
                onChange={(event) =>
                  setVoter({
                    ...voter,
                    niu: event.target.value,
                  })
                }
                type="text"
                placeholder="NIU"
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

              {/* alert */}
              {errorMessage && (
                <Alert variant={"destructive"} className="mt-8">
                  <AlertTitle>Terjadi kesalahan!</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <Button
                className="mt-8"
                onClick={() => login()}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? "Mencoba masuk..." : "Masuk"}
                {isLoading || <LogIn className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-5 relative overflow-hidden border-r border">
          <img
            src="./bg-login.png"
            className="absolute h-screen w-full object-cover grayscale hover:scale-110 duration-300 hover:grayscale-0"
          />
        </div>
      </div>
    </>
  );
}
