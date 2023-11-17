"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function DashboardVoterClient() {
  const [voters, setVoters] = useState<
    Array<{ key: string; name: string; niu: number; accessCode: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <p className="text-2xl font-bold">Daftar pemilih</p>

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
