"use client";

import Navbar from "@/components/navbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JWTVerifyResult } from "jose";
import { Box, CheckCheck, Loader2, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VoteClient(params: { token: JWTVerifyResult }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const candidates: Array<{
    imageUrl?: string;
    title: string;
    description: string;
  }> = [
    {
      imageUrl: "/calon/1.jpg",
      title: "Farras Maula Audina, Emmanuel Oke Cahyo Widiyanto",
      description: "Calon Ketua dan Wakil Ketua Himpunan Teknik Industri",
    },
    {
      title: "Kotak Kosong",
      description: "",
    },
  ];

  const router = useRouter();

  const confirm = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        vote: selectedIndex,
        niu: `${(params.token.payload as any).niu}`,
      }),
    });

    if (!response.ok) {
      const messages: { [key: number]: string } = {
        409: "Suara Anda telah digunakan sebelumnya!",
      };
      setErrorMessage(messages[response.status]);
    } else {
      router.replace("/thankyou");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Navbar>
        <Dialog>
          <DialogTrigger disabled={selectedIndex == -1}>
            <Button disabled={selectedIndex == -1}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Konfirmasi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Pilihan Anda</DialogTitle>
              <DialogDescription className="text-slate-600">
                Saya{" "}
                <span className="font-semibold">
                  {(params.token.payload as any).name}
                </span>{" "}
                dengan NIU{" "}
                <span className="font-semibold">
                  {(params.token.payload as any).niu}
                </span>{" "}
                memilih{" "}
                <span className="font-semibold">
                  {candidates.at(selectedIndex)?.title}
                </span>{" "}
                sebagai Ketua dan Wakil Ketua Himpunan Mahasiswa Teknik
                Industri.
              </DialogDescription>

              {errorMessage && (
                <Alert variant={"destructive"}>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Terjadi kesalahan!</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => confirm()} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCheck className="w-4 h-4 mr-2" />
                )}
                {isLoading ? "Menyimpan suara..." : "Konfirmasi"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Navbar>

      <div className="pt-[4.375rem] max-w-[768px] mx-auto px-4">
        <p className="mt-4">
          <span className="font-semibold text-lg">
            Halo, {(params.token.payload as any).name}!
          </span>{" "}
          <br />
          Silahkan tentukan pilihanmu
        </p>
        <div className="grid grid-cols-2 gap-4 my-4">
          {candidates.map((item, index) => (
            <Card
              className="overflow-hidden flex flex-col h-full"
              key={item.title}
            >
              <CardHeader className="px-0 pt-0">
                <div className="relative w-full">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      className="h-72 object-cover w-full"
                    />
                  ) : (
                    <div className="h-72 border-b bg-slate-100 flex items-center justify-center">
                      <Box className="w-24 h-24 text-slate-300" />
                    </div>
                  )}
                  <div className="relative flex items-center justify-center h-12 w-12 bg-primary -mt-6 mx-auto rounded-full border-white border-[3px]">
                    <p className="text-white font-bold">{index + 1}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <CardTitle className="leading-tight">{item.title}</CardTitle>
                <CardDescription className="mt-2">
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={selectedIndex == index ? "default" : "outline"}
                  onClick={() =>
                    setSelectedIndex(selectedIndex == index ? -1 : index)
                  }
                >
                  {selectedIndex == index ? "Batalkan pilihan" : "Pilih"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
