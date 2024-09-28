import { Deposit } from "@peanut/webkit";
import { DataTable } from "../DataTable";
import { columns, TableDeposit } from "./columns";

const LinksTable = ({ deposits }: { deposits: Deposit[] }) => {
  return (
    <DataTable<TableDeposit, keyof TableDeposit>
      columns={columns}
      data={deposits || []}
    />
  );
};

export default LinksTable;
