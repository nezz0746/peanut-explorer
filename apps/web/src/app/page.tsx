import {
  _SubgraphErrorPolicy_,
  DepositTotals_OrderBy,
  OrderDirection,
} from "@repo/webkit";
import DepositTotalsCard from "../components/DepositTotalsCard";
import { PeanutAPI } from "../services/peanut-api";
import DepositTable from "../components/DepositTable";
import { Separator } from "@repo/ui/components/ui/separator";

export default async function Home() {
  const { depositTotals_collection } = await new PeanutAPI().getTotals({
    where: {},
    first: 5,
    orderBy: DepositTotals_OrderBy.TotalDeposists,
    orderDirection: OrderDirection.Desc,
    subgraphError: _SubgraphErrorPolicy_.Allow,
  });

  return (
    <div className="flex flex-col w-full justify-center p-4 gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Top Deposits</h1>
        <Separator />
        <div className="gap-2 grid grid-cols-6">
          {depositTotals_collection.map((deposit) => {
            return <DepositTotalsCard {...deposit} />;
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Explore Deposits</h1>
        <Separator />
        <DepositTable />
      </div>
    </div>
  );
}
