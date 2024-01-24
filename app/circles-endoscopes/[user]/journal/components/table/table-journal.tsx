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
    ColumnsResearch[keyRow].map((obj) => (
      <Cell key={`${obj}`}>{_.get(item, obj.key)}</Cell>
    ));

  const renderCellEmpty = (item: TKeysIterable, keyRow: TKeysIterableItem) =>
    ColumnsResearch[keyRow].map((obj) => (
      <Cell key={`${obj}`}>{_.get(item, obj.key)}</Cell>
    ));

  const renderBody = (item: TObjectDataProps) => (
    <Row key={item}>
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
  );

  const renderColumn = () =>
    columnsKeys.map((key) =>
      ColumnsResearch[key].map((item) => (
        <Column
          key={`${ColumnsResearch[key]} ${item}`}
          isRowHeader={item.key === "researchId"}
        >
          {item.name}
        </Column>
      ))
    );

  return (
    <div>
      <h1 className="text-2xl">Журнал регистрации</h1>
      <Table aria-label="Table journal">
        <TableHeader>{renderColumn()}</TableHeader>
        <TableBody>{data.map((item) => renderBody(item))}</TableBody>
      </Table>
    </div>
  );
}
