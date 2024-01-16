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
import _ from "lodash";

type TObjectDataProps = {
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
};

type TDataProps = Array<TObjectDataProps>;

export default function TableJournal({ data }: { data: TDataProps }) {
  const columns = Object.keys(ColumnsResearch) as Array<
    keyof typeof ColumnsResearch
  >;

  const renderContent = (item, cell) => {
    if (Array.isArray(item) && item.length === 0) {
      return <Cell key={cell}>{""}</Cell>;
    }
    if (!item) {
      return <Cell key={cell}>{""}</Cell>;
    }
    console.log(item);
    return Object.values(item).map((cell) => <Cell key={cell}>{cell}</Cell>);
  };

  return (
    <div>
      <h1 className="text-2xl">Журнал регистрации</h1>
      <div className="relative overflow-x-auto  shadow-md rounded-md">
        <Table
          aria-label="Files"
          className="w-full text-sm text-center rtl:text-right text-gray-100 dark:text-gray-200 my-8"
        >
          <TableHeader className="text-md text-gray-900 uppercase  bg-gray-50 ">
            {columns.map((keyColumn) =>
              Object.values(ColumnsResearch[keyColumn]).map((itemCol) => (
                <Column
                  className="px-6 py-3"
                  key={itemCol.key}
                  isRowHeader={itemCol.key === "researchId"}
                >
                  {itemCol.name}
                </Column>
              ))
            )}
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <Row key={item}>
                {columns.map((key) => renderContent(item[key], key))}
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
