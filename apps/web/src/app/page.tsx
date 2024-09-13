"use client";

import DepositTable from "../components/DepositsTable";
import TopDeposists from "../components/TopDeposists";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center p-4 gap-4">
      <div className="flex flex-col gap-2 md:w-[400px]">
        <TopDeposists />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <DepositTable />
      </div>
    </div>
  );
}
