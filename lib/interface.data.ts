import {
  Circle,
  Endoscope,
  HistoryFinalCleaning,
  HistoryMachineCleaning,
  HistoryManualCleaning,
  HistoryResearch,
  User,
} from "@prisma/client";

export type Columns = typeof columns;

export type ColumnKeys =
  | "name"
  | "endoscopeId"
  | "name_manufacturer"
  | "date_start"
  | "number_store"
  | "name_kind"
  | "name_department"
  | "action";

export const columns = [
  {
    name: "Эндоскоп",
    key: "name",
  },
  {
    name: "Уникальный номер",
    key: "endoscopeId",
  },
  {
    name: "Производитель",
    key: "name_manufacturer",
  },
  {
    name: "Дата начала",
    key: "date_start",
  },
  {
    name: "Номер шкафа",
    key: "number_store",
  },
  {
    name: "Тип",
    key: "name_kind",
  },
  {
    name: "Отделение",
    key: "name_department",
  },
  {
    name: "Забронировать",
    key: "action",
  },
];

export interface IResearch extends HistoryResearch {
  cleaning: HistoryFinalCleaning[];
  manualCleaning: HistoryManualCleaning[];
  machineCleaning: HistoryMachineCleaning[];
}

export interface EndoscopeFormat extends Endoscope {
  date_start?: string;
  endoscopeId?: number;
  number_store?: number;
  name_kind?: string;
  name_manufacturer?: string;
  name_department?: string;
}

export interface UserProps extends User {
  circles: Circle[];
}
