"use client";

import { ColumnsResearch } from "@/interfaces/table-journal/columns";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Key } from "@react-types/shared";
import React from "react";

export default function TableJournal({ data }: { data: Array<unknown> }) {
  // const columnsType = typeof columns;
  // const rowsType = typeof rows;

  const getKeyValue = (item: unknown, columnKey: Key) => {
    return Object.keys(item).map((keyItem) => item[keyItem][columnKey]);
  };

  return (
    <div>
      <h1 className="text-2xl">Журнал регистрации</h1>
      <div className="relative overflow-x-auto  shadow-md rounded-md">
        {/* <Table>
          <TableHeader columns={ColumnsResearch}>
            {(column) => (
              <TableColumn key={column.key}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow key={item}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table> */}
        <Table>
          {data.}
        </Table>
      </div>
    </div>
  );
}
