"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";

interface LoginErrorMessage {
  [key: string]: string;
}

export default function HomeClient() {
  const [voter, setVoter] = useState({
    niu: "523175",
    accessCode: "9ZO1NX",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      console.log("success");
    } else {
      const { statusText } = response;
      const messages: LoginErrorMessage = {
        "not found": "Akun dengan NIU tersebut tidak ditemukan!",
        "invalid access code": "Kode akses yang Anda masukkan tidak valid!",
      };
      setErrorMessage(messages[statusText.toLowerCase()]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        <div className="col-span-4 relative overflow-hidden border-r border">
          <img
            src="https://images.unsplash.com/photo-1567201864585-6baec9110dac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute h-screen w-full object-cover"
          />
          <p className="absolute bottom-0 m-8 text-4xl font-semibold leading-tight">
            Pemilihan Ketua dan Wakil Ketua Himpunan Teknik Industri UGM
          </p>
        </div>
        <div className="col-span-8 flex items-center">
          <div className="px-8 max-w-[512px] mx-auto">
            <p className="font-bold text-3xl mt-8">Masuk</p>
            <p>Masukkan NIU dan kode akses untuk melanjutkan</p>
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
    </>
  );
}
