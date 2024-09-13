import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import DepositTotalsCard from "./DepositTotalsCard";
import { useExplorerChain } from "../context/ChainContext";
import { useQuery } from "@tanstack/react-query";
import { PeanutAPI } from "../services/peanut-api";
import {
  _SubgraphErrorPolicy_,
  DepositTotals_OrderBy,
  OrderDirection,
} from "@repo/webkit";

const TopDeposists = () => {
  const { chainId } = useExplorerChain();
  const { data } = useQuery({
    queryKey: ["depositTotals", chainId],
    queryFn: async () => {
      return new PeanutAPI(chainId).getTotals({
        where: {},
        first: 5,
        orderBy: DepositTotals_OrderBy.TotalDeposists,
        orderDirection: OrderDirection.Desc,
        subgraphError: _SubgraphErrorPolicy_.Allow,
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>
          Overview of the top 5 deposits by currency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="gap-2 grid grid-cols-2">
          {data?.depositTotals_collection.map((deposit) => {
            return <DepositTotalsCard {...deposit} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopDeposists;
