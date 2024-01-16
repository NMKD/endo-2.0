/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Key, useCallback } from "react";
import { ColumnsResearch } from "@/interfaces/table-journal/columns";
import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

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

export default function TableJournal({ data }: { data: TObjectDataProps[] }) {
  const columnsKeys = Object.keys(ColumnsResearch) as Array<
    keyof typeof ColumnsResearch
  >;

  const renderBody = () =>
    data.map((itemRow: any) =>
      columnsKeys.map((key) => (
        <TableBody items={itemRow[key]} key={itemRow}>
          {(item) => (
            <TableRow key={item}>
              {(columnKey) => (
                <TableCell key={item}>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ))
    );

  const renderColumn = () =>
    columnsKeys.map((key, i) => (
      <TableHeader key={key} columns={ColumnsResearch[key]}>
        {(column) => (
          <TableColumn key={`${column.key} ${i}`}>{column.name}</TableColumn>
        )}
      </TableHeader>
    ));

  return (
    <div>
      <h1 className="text-2xl">Журнал регистрации</h1>
      <Table aria-label="table of endoscope">
        {renderColumn()}
        {renderBody()}
      </Table>
    </div>
  );
}
