import { ReactNode } from "react";

export default function Navbar(params: { children?: ReactNode }) {
  return (
    <>
      <div className="h-1.5 w-full fixed top-0 z-10 bg-gradient-to-r from-lime-400 to-amber-400"></div>
      <div className="h-16 w-full fixed top-0 border-b backdrop-blur z-10 mt-1.5 bg-white bg-opacity-70">
        <div className="h-16 flex items-center mx-auto max-w-[1024px] px-4 justify-between">
          <p className="text-lg font-semibold">Pemilu HMTI UGM 2023</p>

          <div>{params.children && params.children}</div>
        </div>
      </div>
    </>
  );
}
