import {
  HistoryResearch,
  HistoryFinalCleaning,
  HistoryManualCleaning,
  HistoryMachineCleaning,
  Endoscope,
  Circle,
  User,
} from "@prisma/client";

export interface IHistoryResearch extends HistoryResearch {
  cleaning: HistoryFinalCleaning[];
  manualCleaning: HistoryManualCleaning[];
  machineCleaning: HistoryMachineCleaning[];
}

export interface IEndoscopeFormatTable extends Endoscope {
  date_start?: string;
  endoscopeId?: number;
  number_store?: number;
  name_kind?: string;
  name_manufacturer?: string;
  name_department?: string;
}

export interface ICirclesOfUser extends User {
  circles: Circle[];
}
