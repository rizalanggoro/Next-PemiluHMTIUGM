"use client";

import { ComponentChart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

interface InterfaceStatisticItem {
  title: string;
  voterCount: number;
}

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

  const statistics: Array<InterfaceStatisticItem> = [
    {
      title: "Angkatan 2023",
      voterCount: 145,
    },
    {
      title: "Angkatan 2022",
      voterCount: 99,
    },
    {
      title: "Angkatan 2021",
      voterCount: 81,
    },
    {
      title: "Angkatan 2020-2017",
      voterCount: 168,
    },
  ];

  const niuMap: { [key: number]: any } = {
    2023: { bottom: 512045, top: 523332 },
    2022: { bottom: 492667, top: 506020 },
    2021: { bottom: 472933, top: 482952 },
    2020: { bottom: 410292, top: 463419 },
  };

  const getVotedCount = (key: number): number => {
    return votes.filter(
      (item) =>
        Number(item.niu) <= niuMap[key].top &&
        Number(item.niu) >= niuMap[key].bottom
    ).length;
  };

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
          <DialogTrigger disabled={true} asChild>
            <Button variant={"destructive"} className="mt-4" disabled={true}>
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

      <p className="text-xl font-semibold mt-8">
        Statistik Pemilih Tiap Angkatan
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {[2023, 2022, 2021, 2020].map((item, index) => (
          <Card key={"card-statistic-" + index} className="text-center">
            <CardHeader>
              <p className="text-lg font-semibold text-primary">
                {statistics[index].title}
              </p>
            </CardHeader>
            <CardContent>
              <div className="max-w-[240px] max-h-[240px] mx-auto">
                <ComponentChart
                  lables={["Sudah", "Belum"]}
                  data={[
                    getVotedCount(item),
                    statistics[index].voterCount - getVotedCount(item),
                  ]}
                  backgroundColor={["#366078", "#e5e7eb"]}
                  borderColor={["#366078", "#9ca3af"]}
                />
              </div>
              <CardDescription className="mt-4">
                Total pemilih:{" "}
                <span className="font-semibold">
                  {statistics[index].voterCount}
                </span>
              </CardDescription>
              <CardDescription>
                Total memilih:{" "}
                <span className="font-semibold">
                  {getVotedCount(item)} (
                  {(
                    (getVotedCount(item) / statistics[index].voterCount) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </CardDescription>
              <CardDescription>
                Total belum memilih:{" "}
                <span className="font-semibold">
                  {statistics[index].voterCount - getVotedCount(item)} (
                  {(
                    ((statistics[index].voterCount - getVotedCount(item)) /
                      statistics[index].voterCount) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

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
