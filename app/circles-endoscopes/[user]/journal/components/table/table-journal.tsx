/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnsResearch } from "@/interfaces/table-journal/columns";
import { SetStateAction, useState } from "react";
import * as _ from "lodash";

import {
  Cell,
  Column,
  Key,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

interface IReserchCell {
  researchId: number;
  patientId: string;
  userId: number | string;
  endoscopeId: number;
  test: boolean;
  date_research: string;
}

interface ICleaningCell {
  test: boolean;
  name: string;
  userId: number | string;
  start_time: string;
  end_time: string;
}

interface IManualCell {
  temperature: string | number;
  name: string;
  userId: number | string;
  start_time: string;
  end_time: string;
}

interface IMachineCell {
  numberMdm: string | number;
  processingMode: string | number;
  concentration: string | number;
  userId: number | string;
  name: string;
  start_time: string;
  end_time: string;
}

interface TObjectDataProps {
  research: IReserchCell;
  cleaning: ICleaningCell;
  manualCleaning: IManualCell;
  machineCleaning: IMachineCell;
}

type TCell = {
  name: string;
  key: string;
};

type TKeysIterable = IReserchCell | ICleaningCell | IManualCell | IMachineCell;
type TKeysIterableItem = "research" | "cleaning" | "manual" | "machine";

export default function TableJournal({ data }: { data: TObjectDataProps[] }) {
  const columnsKeys = Object.keys(ColumnsResearch) as TKeysIterableItem[];

  const [cleaningKeys, setCleaning] = useState<SetStateAction<ICleaningCell>>({
    test: false,
    name: "",
    userId: "",
    start_time: "",
    end_time: "",
  });
  const [manualKeys, setManual] = useState<SetStateAction<IManualCell>>({
    temperature: "",
    name: "",
    userId: "",
    start_time: "",
    end_time: "",
  });
  const [machineKeys, setMachine] = useState<SetStateAction<IMachineCell>>({
    numberMdm: "",
    processingMode: "",
    concentration: "",
    userId: "",
    name: "",
    start_time: "",
    end_time: "",
  });

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
              : renderCellEmpty(cleaningKeys, keyRow);
          case "manual":
            return checkKeys(item.manualCleaning)
              ? renderCell(item.manualCleaning, keyRow)
              : renderCellEmpty(manualKeys, keyRow);

          case "machine":
            return checkKeys(item.machineCleaning)
              ? renderCell(item.machineCleaning, keyRow)
              : renderCellEmpty(machineKeys, keyRow);

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

  console.log(data);
  return (
    <div>
      <h1 className="text-2xl">Журнал регистрации</h1>
      <Table>
        <TableHeader>{renderColumn()}</TableHeader>
        <TableBody>{data.map((item) => renderBody(item))}</TableBody>
      </Table>
    </div>
  );
}
