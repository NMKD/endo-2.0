/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ICleaningCell,
  IMachineCell,
  IManualCell,
  IReserchCell,
  TColumns,
  TObjectDataProps,
} from "@/interfaces";
import { ColumnsResearch } from "@/interfaces/table-journal/columns";
import * as _ from "lodash";
import { useCallback } from "react";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

type TKeysIterable = IReserchCell | ICleaningCell | IManualCell | IMachineCell;
type TKeysIterableItem = "research" | "cleaning" | "manual" | "machine";

const cssTable = {
  table: "w-full text-sm text-center text-gray-500 dark:text-gray-400",
  thead: {
    head: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300",
    th: "px-6 py-3",
  },

  tbody: {
    tr: "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
    td: "p-4 font-medium text-gray-900 dark:text-gray-400",
  },
  scrolling: "overflow-x-auto",
  tableContainer: "rounded-md",
};

export default function TableJournal({ data }: { data: TObjectDataProps[] }) {
  const columnsKeys = Object.keys(ColumnsResearch) as TKeysIterableItem[];

  const itemCleaning = setState(ColumnsResearch.cleaning);
  const itemManual = setState(ColumnsResearch.manual);
  const itemMachine = setState(ColumnsResearch.machine);

  function setState(arr: Array<TColumns>) {
    const obj: Record<string, string | boolean | number> = {};
    arr.forEach((item) => (obj[item.key] = ""));
    return obj;
  }

  const checkKeys = (keys: TKeysIterable) => {
    if (Array.isArray(keys)) {
      return keys.length === 0 ? false : true;
    }
    return !keys ? false : true;
  };

  const renderCell = (item: TKeysIterable, keyRow: TKeysIterableItem) =>
    ColumnsResearch[keyRow].map((obj, i) => (
      <Cell className={cssTable.tbody.td} key={`${obj.key}-${i}`}>
        {_.get(item, obj.key)}
      </Cell>
    ));

  const renderCellEmpty = (item: TKeysIterable, keyRow: TKeysIterableItem) =>
    ColumnsResearch[keyRow].map((obj, i) => (
      <Cell className={cssTable.tbody.td} key={`${obj.key}-${i}`}>
        {_.get(item, obj.key)}
      </Cell>
    ));

  const renderBody = useCallback(
    (item: TObjectDataProps) => (
      <Row className={cssTable.tbody.tr} key={item.research.date_research}>
        {columnsKeys.map((keyRow) => {
          switch (keyRow) {
            case "research":
              return (
                checkKeys(item.research) && renderCell(item.research, keyRow)
              );
            case "cleaning":
              return checkKeys(item.cleaning)
                ? renderCell(item.cleaning, keyRow)
                : renderCellEmpty(itemCleaning, keyRow);
            case "manual":
              return checkKeys(item.manualCleaning)
                ? renderCell(item.manualCleaning, keyRow)
                : renderCellEmpty(itemManual, keyRow);

            case "machine":
              return checkKeys(item.machineCleaning)
                ? renderCell(item.machineCleaning, keyRow)
                : renderCellEmpty(itemMachine, keyRow);

            default:
              break;
          }
        })}
      </Row>
    ),
    [columnsKeys, itemCleaning, itemMachine, itemManual]
  );

  const renderCol = useCallback((key: keyof typeof ColumnsResearch) => {
    return ColumnsResearch[key].map((item, i) => (
      <Column
        className={cssTable.thead.th}
        key={`${ColumnsResearch[key]} ${i}`}
        isRowHeader={item.key === "researchId"}
      >
        {item.name}
      </Column>
    ));
  }, []);

  return (
    <>
      <h1 className="text-2xl text-center my-8">Журнал регистрации</h1>
      <div className={`${cssTable.scrolling} ${cssTable.tableContainer}`}>
        <Table aria-label="Table journal" className={cssTable.table}>
          <TableHeader className={cssTable.thead.head}>
            {columnsKeys.map((keyColumn) => renderCol(keyColumn))}
          </TableHeader>
          <TableBody>{data.map((item) => renderBody(item))}</TableBody>
        </Table>
      </div>
    </>
  );
}
