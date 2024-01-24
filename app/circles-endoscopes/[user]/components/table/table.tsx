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
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IEndoscopeFormatTable, TFnToBooking, columns } from "@/interfaces";
import React from "react";
import { SearchIcon } from "@/components/icons";

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
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItem = React.useMemo(() => {
    let filteredEndoscopes = [...dataEndoscopes];
    if (hasSearchFilter) {
      filteredEndoscopes = filteredEndoscopes.filter((endo) =>
        endo.endoscopeId
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLocaleLowerCase())
      );
    }
    return filteredEndoscopes;
  }, [dataEndoscopes, filterValue, hasSearchFilter]);

  // to booking endoscope
  const onClickButton = useCallback(
    async (endId: number, userId: number) => {
      await toBooking(endId, userId);
      router.refresh();
    },
    [router, toBooking]
  );

  // render content endoscopes
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

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div>
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
    );
  }, [filterValue, onClear, onSearchChange]);

  return (
    <Table aria-label="table of endoscope" topContent={topContent}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={filteredItem}
        emptyContent={"Нет данных или свободных эндоскопов ..."}
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
