"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardVoterClient() {
  const [voters, setVoters] = useState<
    Array<{ key: string; name: string; niu: number; accessCode: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoters = async () => {
      setIsLoading(true);
      let url = "/api/dashboard/voter";
      if (voters.length > 0) url += "?lastkey=" + voters[voters.length - 1].key;

      const response = await fetch(url);

      if (response.ok) {
        const json = await response.json();
        if ((json.items as Array<any>).length == 0) setIsLoading(false);
        else setVoters([...voters, ...json.items]);
      }
      setIsLoading(false);
    };

    loadVoters();
  }, [voters]);

  const copyJSON = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(
        voters.map((item) => {
          return {
            NIU: item.niu,
            Nama: item.name,
            "Kode Akses": item.accessCode,
          };
        })
      )
    );
    toast({
      title: "JSON pemilih berhasil di-copy ke clipboard!",
    });
  };

  return (
    <>
      <Toaster />

      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold">Daftar pemilih</p>
        <Button onClick={() => copyJSON()}>
          <Copy className="w-4 h-4 mr-2" />
          Copy JSON
        </Button>
      </div>

      <Table className="mt-4">
        <TableCaption>
          {isLoading ? (
            <p>Memuat data pemilih...</p>
          ) : (
            <p>Terdapat {voters.length} pemilih</p>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>NIU</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kode Akses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voters.map((item) => (
            <TableRow key={item.niu}>
              <TableCell className="font-medium">{item.niu}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.accessCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
