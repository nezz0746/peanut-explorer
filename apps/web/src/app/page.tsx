import {
  _SubgraphErrorPolicy_,
  DepositTotals_OrderBy,
  OrderDirection,
} from "@repo/webkit";
import DepositTotalsCard from "../components/DepositTotalsCard";
import { PeanutAPI } from "../services/peanut-api";
import DepositTable from "../components/DepositTable";

export default async function Home() {
  const { depositTotals_collection } = await new PeanutAPI().getTotals({
    where: {},
    first: 5,
    orderBy: DepositTotals_OrderBy.TotalDeposists,
    orderDirection: OrderDirection.Desc,
    subgraphError: _SubgraphErrorPolicy_.Allow,
  });

  return (
    <div className="flex flex-col w-full justify-center p-4 gap-4">
      <div className="flex flex-col gap-2">
        <div className="gap-2 grid grid-cols-6">
          {depositTotals_collection.map((deposit) => {
            return <DepositTotalsCard {...deposit} />;
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <DepositTable />
      </div>
    </div>
  );
}
