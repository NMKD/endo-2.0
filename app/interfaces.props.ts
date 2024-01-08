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
  toCleaning: (pcId: TNullString) => Promise<Circle | undefined>;
  toStore: (id: TNullString) => Promise<void>;
  toEndWashingMch: (
    id: TNullString,
    idp: TNullNumber
  ) => Promise<Circle | undefined>;
  toEndWashingMl: (
    id: TNullString,
    idp: TNullNumber
  ) => Promise<Circle | undefined>;
  toResearch: (
    id: TNullNumber,
    userId: TNullNumber
  ) => Promise<Circle | undefined>;
}
