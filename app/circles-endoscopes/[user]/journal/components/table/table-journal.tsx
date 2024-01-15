"use client";

import { ColumnsResearch } from "@/interfaces/table-journal/columns";
import {
  // Cell,
  Column,
  Row,
  Table,
  // TableBody,
  TableHeader,
} from "react-aria-components";
import { Key } from "@react-types/shared";
import React from "react";

export default function TableJournal({ data }: { data: Array<unknown> }) {
  // const columnsType = typeof columns;
  // const rowsType = typeof rows;
  console.log(data);
  const renderColumnValue = (
    item: { name: string; key: string },
    columnKey: Key
  ) => {
    switch (columnKey) {
      case "research":
        return (
          <Column
            className="px-6 py-3"
            key={item.key}
            isRowHeader={item.key === "id"}
          >
            {item.name}
          </Column>
        );
        break;

      default:
        break;
    }
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
        <Table
          aria-label="Files"
          className="w-full text-sm text-center rtl:text-right text-gray-100 dark:text-gray-200 my-8"
        >
          <TableHeader className="text-md text-gray-900 uppercase  bg-gray-50 ">
            {(
              Object.keys(ColumnsResearch) as Array<
                keyof typeof ColumnsResearch
              >
            ).map((keyColumn) =>
              Object.values(ColumnsResearch[keyColumn]).map((value) =>
                renderColumnValue(value, keyColumn)
              )
            )}
          </TableHeader>
        </Table>
      </div>
    </div>
  );
}
