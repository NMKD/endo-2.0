/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

// const nameResearch = "Исследования";
// const nameClearing = "Предварительная мойка";
// const nameManualClearing = "Ручная мойка";
// const nameMachineCleaning = "Машинная мойка";
// const COLUMNS_RESEARCH = {
//   id_research: {
//     path: "id_research",
//     name: "ID исследования",
//   },
//   date_research: {
//     path: "date_research",
//     name: "Дата исследования",
//   },
//   code_endsc: {
//     path: "code_endsc",
//     name: "Код эндоскопа",
//   },
//   test_germ: { path: "test_germ", name: "Тест на гермитичность" },
//   add_clearing: {
//     name: "Предварительная мойка",
//     component: (key) => (
//       <Link className="btn btn-success" to={`research/` + key.id_research}>
//         Начать
//       </Link>
//     ),
//   },
// };
// const COLUMNS_CLEARING = {
//   id_research: {
//     path: "id_research",
//     name: "ID исследования",
//   },
//   name_facility: {
//     path: "name_facility",
//     name: "Наименование средства",
//   },
//   start_time: {
//     path: "start_time",
//     name: "Время начала",
//   },
//   end_time: {
//     path: "end_time",
//     name: "Время окончания",
//   },
//   test_general: {
//     path: "test_general",
//     name: "Тест на качество",
//   },
//   operator: {
//     path: "operator",
//     name: "Имя оператора",
//   },
//   add_manual_clearing: {
//     name: "Ручная стерилизация",
//     component: (key) => (
//       <Link className="btn btn-success" to={`research/` + key.id_research}>
//         Начать
//       </Link>
//     ),
//   },
// };
// const COLUMNS_MANUAL_CLEARING = {
//   id_research: {
//     path: "id_research",
//     name: "ID исследования",
//   },
//   name_facility_dvu: {
//     path: "name_facility_dvu",
//     name: "Наименование средства ДВУ",
//   },
//   temprature_fluid: {
//     path: "temprature_fluid",
//     name: "Температура рабочего раствора",
//   },
//   fluid_level: {
//     path: "fluid_level",
//     name: "Уровень содержания ДВ",
//   },
//   disinfection_extract: {
//     path: "disinfection_extract",
//     name: "Время дезинфекционной выдержки",
//   },
//   operator: {
//     path: "operator",
//     name: "Имя оператора",
//   },
// };

// const COLUMNS_MACHINE_CLEANING = {
//   id_research: {
//     path: "id_research",
//     name: "ID исследования",
//   },
//   name_facility_dvu: {
//     path: "name_facility_dvu",
//     name: "Наименование средства ДВУ",
//   },
//   number_mdm: {
//     path: "number_mdm",
//     name: "Номер МДМ",
//   },
//   fluid_level: {
//     path: "fluid_level",
//     name: "Уровень содержания ДВ",
//   },
//   processing_mode: {
//     path: "processing_mode",
//     name: "Номер режима обработки",
//   },
//   circle: {
//     path: "circle",
//     name: "Цикл - время окончания",
//   },
//   operator: {
//     path: "operator",
//     name: "Имя оператора",
//   },
// };

// const reportManualClearing = [...report].filter(
//   (item) => item.manual_clearing
// );
// const reportMachineCleaning = [...report].filter(
//   (item) => item.machine_cleaning
// );

// const report_research =
//   reportManualClearing.length > 0 &&
//   [...reportManualClearing].map((item) => ({
//     id_research: item.manual_clearing.id_research,
//     date_research: item.manual_clearing.research.date_research,
//     code_endsc: item.manual_clearing.research.code_endsc,
//     test_germ: item.manual_clearing.research.test_germ
//       ? "Пройден"
//       : "Не пройдет",
//   }));
// const report_clearing =
//   reportManualClearing.length > 0 &&
//   [...reportManualClearing].map((item) => ({
//     id_research: item.manual_clearing.id_research,
//     name_facility: item.manual_clearing.clearing.name_facility,
//     start_time: item.manual_clearing.clearing.start_time,
//     end_time: item.manual_clearing.clearing.end_time,
//     test_general: item.manual_clearing.clearing.test_general
//       ? "Пройден"
//       : "Не пройдет",
//     operator: item.manual_clearing.clearing.operator,
//   }));

// const report_manual_clearing =
//   reportManualClearing.length > 0 &&
//   [...reportManualClearing].map((item) => ({
//     id_research: item.manual_clearing.id_research,
//     name_facility_dvu: item.manual_clearing.manual_clearing.name_facility_dvu,
//     temprature_fluid: item.manual_clearing.manual_clearing.temprature_fluid,
//     fluid_level: item.manual_clearing.manual_clearing.fluid_level,
//     disinfection_extract:
//       item.manual_clearing.manual_clearing.disinfection_extract.start_time +
//       ":" +
//       item.manual_clearing.manual_clearing.disinfection_extract.end_time,
//     operator: item.manual_clearing.manual_clearing.operator,
//   }));

// const report_machine_cleaning =
//   reportMachineCleaning.length > 0 &&
//   [...reportMachineCleaning].map((item) => ({
//     id_research: item.machine_cleaning.id_research,
//     name_facility_dvu:
//       item.machine_cleaning.machine_cleaning.name_facility_dvu,
//     number_mdm: item.machine_cleaning.machine_cleaning.number_mdm,
//     processing_mode: item.machine_cleaning.machine_cleaning.processing_mode,
//     fluid_level: item.machine_cleaning.machine_cleaning.fluid_level,
//     circle: item.machine_cleaning.machine_cleaning.circle.end_time,
//     operator: item.machine_cleaning.machine_cleaning.operator,
//   }));

// return (
//   <>
//     <h1 className="mb-5">Журнал регистрации</h1>
//     {reportManualClearing.length > 0 && reportMachineCleaning.length > 0 ? (
//       <>
//         <Table
//           {...{
//             data: report_research,
//             columns: COLUMNS_RESEARCH,
//             name: nameResearch,
//           }}
//         />
//         <Table
//           {...{
//             data: report_clearing,
//             columns: COLUMNS_CLEARING,
//             name: nameClearing,
//           }}
//         />
//         <Table
//           {...{
//             data: report_manual_clearing,
//             columns: COLUMNS_MANUAL_CLEARING,
//             name: nameManualClearing,
//           }}
//         />
//         <Table
//           {...{
//             data: report_machine_cleaning,
//             columns: COLUMNS_MACHINE_CLEANING,
//             name: nameMachineCleaning,
//           }}
//         />
//       </>
//     ) : (
//       <SnippedLoader />
//     )}
//   </>
// );

export default function TableJournal({ data }) {
  console.log(data);
  return (
    // <Table
    //   aria-label="static data"
    //   color="success"
    //   selectionMode="single"
    //   defaultSelectedKeys={["2"]}
    // >
    //   <TableHeader columns={columns}>
    //     {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
    //   </TableHeader>
    //   <TableBody items={data} emptyContent={"Нет записей в журнале"}>
    //     {(row) => (
    //       <TableRow key={row.id}>
    //         {(columnKey) => (
    //           <TableCell>{getKeyValue(row, columnKey)}</TableCell>
    //         )}
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>
    <>Table</>
  );
}
