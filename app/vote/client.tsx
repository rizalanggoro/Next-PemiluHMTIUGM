"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JWTVerifyResult } from "jose";
import { CheckCheck } from "lucide-react";
import { useState } from "react";

export default function VoteClient(params: { token: JWTVerifyResult }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const candidates: Array<{
    imageUrl: string;
    title: string;
    description: string;
  }> = [
    {
      imageUrl: "/calon/1.jpg",
      title: "Farras Maula Audina, Emmanuel Oke Cahyo Widiyanto",
      description: "Calon Ketua dan Wakil Ketua Himpunan Teknik Industri",
    },
    {
      imageUrl: "/calon/1.jpg",
      title: "Suara putih",
      description: "Memilih untuk tidak memberikan suara",
    },
  ];

  return (
    <>
      <Navbar>
        <Button disabled={selectedIndex == -1}>
          <CheckCheck className="w-4 h-4 mr-2" />
          Konfirmasi
        </Button>
      </Navbar>

      <div className="pt-[4.375rem] max-w-[768px] mx-auto px-4">
        <p className="mt-4">
          <span className="font-semibold text-lg">
            Halo, {(params.token.payload as any).name}!
          </span>{" "}
          <br />
          Silahkan tentukan pilihanmu
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {candidates.map((item, index) => (
            <Card
              className="overflow-hidden flex flex-col h-full"
              key={item.title}
            >
              <CardHeader className="px-0 pt-0">
                <img src={item.imageUrl} className="h-72 object-cover" />
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
