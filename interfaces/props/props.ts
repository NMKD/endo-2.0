import { Circle, Store } from "@prisma/client";
import { ICirclesOfUser } from "..";

// types for data
export type TNullNumber = null | number;
export type TNullString = null | string;
export type TFnToCleaning = (pcId: TNullString) => Promise<Circle | undefined>;
export type TFnToStore = (id: TNullString) => Promise<void>;
export type TFnToEndWashingMch = (
  id: TNullString,
  idp: TNullNumber
) => Promise<Circle | undefined>;
export type TFnToEndWashingMl = (
  id: TNullString,
  idp: TNullNumber
) => Promise<Circle | undefined>;
export type TFnToResearch = (
  id: TNullNumber,
  userId: TNullNumber
) => Promise<Circle | undefined>;
export type TFnToBooking = (
  endId: number,
  userId: number
) => Promise<Store | undefined>;

export interface IEndoscopesProps {
  user: ICirclesOfUser;
  toCleaning: TFnToCleaning;
  toStore: TFnToStore;
  toEndWashingMch: TFnToEndWashingMch;
  toEndWashingMl: TFnToEndWashingMl;
  toResearch: TFnToResearch;
}
