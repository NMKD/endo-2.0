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
};
