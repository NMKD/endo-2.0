export type Columns = typeof columns;

export enum EnumColumnKeys {
  name = "name",
  endoscopeId = "endoscopeId",
  name_manufacturer = "name_manufacturer",
  date_start = "date_start",
  number_store = "number_store",
  name_kind = "name_kind",
  name_department = "name_department",
  action = "action",
}

// export type ColumnKeys =
//   | "name"
//   | "endoscopeId"
//   | "name_manufacturer"
//   | "date_start"
//   | "number_store"
//   | "name_kind"
//   | "name_department"
//   | "action";

export const columns = [
  {
    name: "Эндоскоп",
    key: EnumColumnKeys.name,
  },
  {
    name: "Уникальный номер",
    key: EnumColumnKeys.endoscopeId,
  },
  {
    name: "Производитель",
    key: EnumColumnKeys.name_manufacturer,
  },
  {
    name: "Дата начала",
    key: EnumColumnKeys.date_start,
  },
  {
    name: "Номер шкафа",
    key: EnumColumnKeys.number_store,
  },
  {
    name: "Тип",
    key: EnumColumnKeys.name_kind,
  },
  {
    name: "Отделение",
    key: EnumColumnKeys.name_department,
  },
  {
    name: "Забронировать",
    key: EnumColumnKeys.action,
  },
];
