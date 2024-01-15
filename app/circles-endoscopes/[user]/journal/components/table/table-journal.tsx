/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnsResearch } from "@/interfaces/table-journal/columns";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import { Key } from "@react-types/shared";
import React from "react";

export default function TableJournal({
  data,
}: {
  data: Array<{
    research: {
      researchId: number;
      patientId: string;
      userId: number | null;
      endoscopeId: number;
      test: string;
      date_research: string;
    };
    cleaning: any;
    manualCleaning: any;
    machineCleaning: any;
  }>;
}) {
  const renderCell = (item: any) =>
    Object.values(item).map((value: any) => <Cell key={value}>{value}</Cell>);
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

      default:
        break;
    }
  };

  const renderBodyValue = () => {
    return data.map((row) =>
      Object.keys(row).map((key) => {
        switch (key) {
          case "research":
            return <Row key={row[key]}>{renderCell(row[key])}</Row>;
          default:
            break;
        }
      })
    );
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
          <TableBody>{renderBodyValue()}</TableBody>
        </Table>
      </div>
    </div>
  );
}
