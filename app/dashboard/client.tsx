"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RotateCcw } from "lucide-react";
import Randomstring from "randomstring";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [votes, setVotes] = useState<
    Array<{
      key: string;
      vote: number;
      niu: string;
    }>
  >([]);
  const [isFetchingVotes, setIsFetchingVotes] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogResetOpen, setIsDialogResetOpen] = useState(false);

  const candidates = [
    "Farras Maula Audina, Emmanuel Oke Cahyo Widiyanto",
    "Kotak Kosong",
  ];

  const dummyVotes = async () => {
    for (let a = 0; a < 25; a++) {
      const random = Math.floor(Math.random() * 2);
      const response = await fetch("/api/vote", {
        method: "POST",
        body: JSON.stringify({
          niu: Randomstring.generate({ length: 8 }),
          vote: random,
        }),
      });
      if (response.ok) console.log("done");
    }
  };

  const resetVotes = async () => {
    setIsDeleting(true);
    for (let a = 0; a < votes.length; a++) {
      const vote = votes[a];
      const response = await fetch("/api/dashboard/vote?key=" + vote.key, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("suara ke-" + (a + 1) + " berhasil dihapus!");
      }
    }
    setIsDialogResetOpen(false);
    setIsDeleting(false);
  };

  useEffect(() => {
    setIsFetchingVotes(true);

    const fetchData = async () => {
      let url = "/api/dashboard/vote";
      if (votes.length > 0) {
        url = url + "?lastkey=" + votes[votes.length - 1].key;
      }

      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const json = await response.json();
        if ((json.items as Array<any>).length == 0) {
          setIsFetchingVotes(false);
        } else {
          setVotes([...votes, ...json.items]);
        }
      }
    };

    fetchData();
  }, [votes]);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold">Hasil Pemilihan</p>
        {/* <button onClick={() => dummyVotes()}>Dummy votes</button> */}
        <Dialog open={isDialogResetOpen} onOpenChange={setIsDialogResetOpen}>
          <DialogTrigger disabled={votes.length == 0} asChild>
            <Button
              variant={"destructive"}
              className="mt-4"
              disabled={votes.length == 0}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Hasil Pemilihan</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin akan mereset hasil pemilihan? Tindakan ini
                tidak dapat dipulihkan!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                disabled={isDeleting}
                variant={"destructive"}
                onClick={() => resetVotes()}
              >
                {isDeleting ? "Menghapus suara..." : "Ya, saya yakin"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* summary */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Perolehan suara</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {[0, 1].map((item) => (
              <div
                className="flex items-center gap-4"
                key={"candidate-number-" + item}
              >
                <div className="rounded-full h-8 w-8 bg-primary flex justify-center items-center">
                  <p className="text-white font-semibold text-sm">{item + 1}</p>
                </div>
                <div>
                  <p className="text-primary">{candidates[item]}</p>
                  <p className="text-slate-600">
                    {votes.filter((vote) => vote.vote == item).length} suara
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* table */}
      <Table className="mt-4 mb-8">
        <TableCaption>
          {isFetchingVotes ? (
            <p>Memuat data suara...</p>
          ) : (
            <p>Terdapat {votes.length} suara</p>
          )}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>NIU</TableHead>
            <TableHead>Pilihan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {votes.map((item, index) => (
            <TableRow key={item.key + index}>
              <TableCell className="font-medium">
                {item.niu.substring(0, item.niu.length - 3)}
                {"***"}
              </TableCell>
              <TableCell>{candidates.at(item.vote)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
