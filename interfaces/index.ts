import {
  IHistoryResearch,
  IEndoscopeFormatTable,
  ICirclesOfUser,
} from "./extension/prisma.ext";
import {
  IEndoscopesProps,
  TNullNumber,
  TNullString,
  TFnToCleaning,
  TFnToStore,
  TFnToEndWashingMch,
  TFnToEndWashingMl,
  TFnToResearch,
  TFnToBooking,
} from "./props/props";
import {
  IReserchCell,
  ICleaningCell,
  IManualCell,
  IMachineCell,
  TObjectDataProps,
  TColumns,
} from "./table-journal/table";
import { columns } from "./table/columns";

export { columns };
export type {
  IHistoryResearch,
  IEndoscopeFormatTable,
  ICirclesOfUser,
  IEndoscopesProps,
  TNullNumber,
  TNullString,
  TFnToCleaning,
  TFnToStore,
  TFnToEndWashingMch,
  TFnToEndWashingMl,
  TFnToResearch,
  TFnToBooking,
  IReserchCell,
  ICleaningCell,
  IManualCell,
  IMachineCell,
  TObjectDataProps,
  TColumns,
};
