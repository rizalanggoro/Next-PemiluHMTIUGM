import { promises as fs } from "fs";
import DashboardVoterUploadClient from "./client";

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/assets/students.json",
    "utf-8"
  );
  const data = JSON.parse(file);

  return (
    <>
      <DashboardVoterUploadClient studentData={data} />
    </>
  );
}
