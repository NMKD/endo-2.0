export enum Facility {
  name = "Наименование средства",
  concentration = "Концетрация раствора",
}
export enum JournalColumnKeys {
  id = "id",
  patientId = "patientId",
  userId = "user",
  endoscopeId = "endoscopeId",
  date_research = "date_research",
  test = "test",
  facility = "facility",
  start_time = "start_time",
  end_time = "end_time",
  numberMdm = "numberMdm",
  processingMode = "processingMode",
  temperature = "temperature",
}

export enum JournalValues {
  id = "Номер исследования",
  patientId = "Пациент",
  userId = "Отвественный",
  endoscopeId = "ID эндоскопа",
  date_research = "Дата иследования",
  test = "Тест на гермитичность",
  facility = "Средство очистки",
  start_time = "Время начала",
  end_time = "Время окончания",
  numberMdm = "Номер МДМ",
  processingMode = "Номер режима обработки",
  temperature = "Температура рабочего раствора",
}

export type TColumnsReserch = typeof ColumnsResearch;

export const ColumnsResearch = [
  {
    name: "Номер исследования",
    key: JournalColumnKeys.id,
  },
  {
    name: "Пациент",
    key: JournalColumnKeys.patientId,
  },
  {
    name: "Отвественный",
    key: JournalColumnKeys.userId,
  },
  {
    name: "ID эндоскопа",
    key: JournalColumnKeys.date_research,
  },
  {
    name: "Дата иследования",
    key: JournalColumnKeys.endoscopeId,
  },
  {
    name: "Тест на гермитичность",
    key: JournalColumnKeys.test,
  },
];
