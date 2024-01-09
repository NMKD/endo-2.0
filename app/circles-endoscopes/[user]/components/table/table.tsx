/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IEndoscopeFormatTable, TFnToBooking, columns } from "@/interfaces";

export default function TableData({
  paramsUserId,
  dataEndoscopes,
  toBooking,
}: {
  paramsUserId: string;
  dataEndoscopes: IEndoscopeFormatTable[];
  toBooking: TFnToBooking;
}) {
  const router = useRouter();
  const onClickButton = useCallback(
    async (endId: number, userId: number) => {
      await toBooking(endId, userId);
      router.refresh();
    },
    [router, toBooking]
  );

  const renderCell = useCallback(
    (row: any, columnKey: string | number) => {
      const cellValue = row[columnKey];
      switch (columnKey) {
        case "action":
          return (
            <div className="relative flex items-center gap-2">
              <Button
                color="warning"
                onClick={() =>
                  onClickButton(row.endoscopeId, Number(paramsUserId))
                }
              >
                Отправить
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onClickButton, paramsUserId]
  );
  return (
    <Table aria-label="table of endoscope">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={dataEndoscopes}
        emptyContent={
          "Для отображения данных, добавьте в базу данных эндоскопы по ссылке ......"
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
