"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Home, UploadCloud, Users2, Vote } from "lucide-react";
import { usePathname } from "next/navigation";

type DashboardMenuItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardMenus: Array<DashboardMenuItem> = [
    { title: "Utama", href: "/dashboard", icon: <Home className="h-4 w-4" /> },
    {
      title: "Data pemilih",
      href: "/dashboard/voter",
      icon: <Users2 className="h-4 w-4" />,
    },
    {
      title: "Unggah pemilih",
      href: "/dashboard/voter/upload",
      icon: <UploadCloud className="h-4 w-4" />,
    },
    {
      title: "Hasil pemilihan",
      href: "/dashboard/result",
      icon: <Vote className="h-4 w-4" />,
    },
  ];

  const pathname = usePathname();

  return (
    <>
      <Navbar />

      {/* content */}
      <div className="grid grid-cols-12 pt-16 px-4 mx-auto max-w-[1024px] gap-4 my-4">
        {/* dashboard menus */}
        <div className="col-span-3 flex flex-col text-left gap-2">
          {dashboardMenus.map((item) => (
            <a href={item.href} className="w-full block" key={item.title}>
              <Button
                className="justify-start w-full items-center gap-2"
                variant={item.href == pathname ? "secondary" : "ghost"}
              >
                {item.icon && <>{item.icon}</>}
                {item.title}
              </Button>
            </a>
          ))}
        </div>

        {/* dashboard content */}
        <div className="col-span-9">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
