"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useEffect } from "react";

export default async function Page() {
  useEffect(() => {
    const logout = async () => {
      fetch("/api/auth/logout");
    };

    logout();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-[4.375rem] max-w-[512px] mx-auto px-4">
        <ThumbsUp className="animate-bounce mt-8 text-lime-600" />
        <p className="mt-4 mb-8">
          Terima kasih telah berpartisipasi dalam pemilihan Ketua dan Wakil
          Ketua Himpunan Mahasiswa Teknik Industri.
        </p>

        <a href="/">
          <Button variant={"secondary"} className="mb-8">
            Kembali ke halaman utama
          </Button>
        </a>
      </div>
    </>
  );
}
