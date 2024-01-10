import { ColumnsResearch } from "@/interfaces/table-journal/columns";
import { IHistoryResearch } from "../../../../../../interfaces/extension/prisma.ext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

function TableResearch({ data }: { data: IHistoryResearch[] }) {
  const columns = ColumnsResearch;
  return (
    <Table
      aria-label="static data"
      color="success"
      selectionMode="single"
      defaultSelectedKeys={["2"]}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={data} emptyContent={"Нет записей в журнале"}>
        {(row) => (
          <TableRow key={row.date_research}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TableResearch;
