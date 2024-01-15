import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Table,
} from "@nextui-org/react";
import { ColumnsCleaningF } from "@/interfaces/table-journal/columns";
import { HistoryFinalCleaning } from "@prisma/client";

function TableCleaningF({ cleaning }: { cleaning: HistoryFinalCleaning }) {
  const columns = ColumnsCleaningF;
  return (
    <Table color="success" selectionMode="single" defaultSelectedKeys={["2"]}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={[cleaning]}
        emptyContent={"Нет записей в журнале о финальной очистки"}
      >
        {(row) => (
          <TableRow key={row.start_time}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TableCleaningF;
