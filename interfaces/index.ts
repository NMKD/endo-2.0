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
} from "./props/props";
import { columns } from "./table/columns";

// columns of table and extension prisma servises
export { columns, IHistoryResearch, IEndoscopeFormatTable, ICirclesOfUser };
// data of props
export { IEndoscopesProps };
// types of props
export {
  TNullNumber,
  TNullString,
  TFnToCleaning,
  TFnToStore,
  TFnToEndWashingMch,
  TFnToEndWashingMl,
  TFnToResearch,
};
