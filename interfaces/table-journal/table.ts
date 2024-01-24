export interface IReserchCell {
  researchId: number;
  patientId: string;
  userId: number | string;
  endoscopeId: number;
  test: boolean | string;
  date_research: string;
}

export interface ICleaningCell {
  test: boolean | string;
  name: string;
  userId: number | string;
  start_time: string;
  end_time: string;
}

export interface IManualCell {
  temperature: string | number;
  name: string;
  userId: number | string;
  start_time: string;
  end_time: string;
}

export interface IMachineCell {
  numberMdm: string | number;
  processingMode: string | number;
  concentration: string | number;
  userId: number | string;
  name: string;
  start_time: string;
  end_time: string;
}

export interface TObjectDataProps {
  research: IReserchCell;
  cleaning: ICleaningCell;
  manualCleaning: IManualCell;
  machineCleaning: IMachineCell;
}

export type TColumns = {
  name: string;
  key: string;
};
