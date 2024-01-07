import { UserProps } from "@/lib/interface.data";
import { Circle } from "@prisma/client";

export type TNullNumber = null | number;
export type TNullString = null | string;

export interface UserSlice {
  circles?: Circle[];
  id: number;
  name: string;
  role: string;
  departmentId: number;
}

export interface EndoscopesProps {
  user: UserProps;
  toCleaning: (id: TNullString, endId: TNullNumber) => Promise<void>;
  toStore: (id: TNullString) => Promise<void>;
  toEndWashingMch: (id: TNullString, idp: TNullNumber) => Promise<void>;
  toEndWashingMl: (id: TNullString, idp: TNullNumber) => Promise<void>;
  toResearch: (endId: TNullNumber, userId: TNullNumber) => Promise<void>;
}
