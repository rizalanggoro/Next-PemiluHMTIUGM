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
import Randomstring from "randomstring";
import { useState } from "react";

export default function DashboardVoterUploadClient(params: {
  studentData: Array<{
    NIU: number;
    Nama: string;
  }>;
}) {
  const [successCount, setSuccessCount] = useState(0);
  const upload = () => {
    params.studentData.forEach(async (item) => {
      const { NIU: niu, Nama: name } = item;
      const accessCode = Randomstring.generate({
        length: 6,
        capitalization: "uppercase",
        charset: "alphanumeric",
      });

      const response = await fetch("/api/dashboard/voter", {
        method: "POST",
        body: JSON.stringify({
          niu,
          name,
          accessCode,
        }),
      });

      if (response.ok) {
        setSuccessCount(successCount + 1);
      }
    });
  };

  return (
    <>
      <p className="text-2xl font-bold">Unggah Data Pemilih</p>

      <Button className="my-4">Upload : {successCount}</Button>

      <Table>
        <TableCaption>Total: {params.studentData.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>NIU</TableHead>
            <TableHead>Nama</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {params.studentData.map((student) => (
            <TableRow key={student.NIU}>
              <TableCell>{student.NIU}</TableCell>
              <TableCell>{student.Nama}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
