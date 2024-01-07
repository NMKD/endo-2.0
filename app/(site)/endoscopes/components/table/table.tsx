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
import { EndoscopeFormat, columns } from "@/lib/interface.data";
import { createBookingUser } from "@/lib/prisma.services";
import { Circle } from "@prisma/client";

interface UserProp {
  circles?: Circle[];
  id: number;
  name: string;
  role: string;
  departmentId: number;
}

export default function TableData({
  user,
  dataEndoscopes,
}: {
  user: UserProp;
  dataEndoscopes: EndoscopeFormat[];
}) {
  const onClickButton = useCallback(
    (endId: number, userId: number | null) => createBookingUser(endId, userId),
    []
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
                onClick={() => onClickButton(row.endoscopeId, user.id)}
              >
                Отправить
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onClickButton, user.id]
  );
  return (
    <Table aria-label="able of endoscope">
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
