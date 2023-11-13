import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserX2 } from "lucide-react";

export default async function Page() {
  const baseUrl = process.env.BASE_URL;
  const response = await fetch(baseUrl + "api/dashboard/voter", {
    method: "GET",
  });

  if (!response.ok) {
    const { status, statusText } = response;
    console.log({ status, statusText });

    return (
      <>
        <p>Something went wrong! Message: {statusText}</p>
      </>
    );
  }

  const json: { paging: any; items: Array<any> } = await response.json();

  return (
    <>
      <p className="text-2xl font-bold">Daftar pemilih</p>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>NIM</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kode Akses</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {json.items.map((item) => (
            <>
              <TableRow key={item.nim}>
                <TableCell className="font-medium">{item.nim}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.accessCode}</TableCell>
                <TableCell>
                  <Button variant={"destructive"} size={"icon"}>
                    <UserX2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
