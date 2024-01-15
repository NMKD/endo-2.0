export enum Facility {
  name = "Наименование средства",
  concentration = "Концетрация раствора",
}
export enum JournalColumnKeys {
  researchId = "researchId",
  patientId = "patientId",
  userId = "user",
  endoscopeId = "endoscopeId",
  date_research = "date_research",
  test = "test",
  name = "facility",
  start_time = "start_time",
  end_time = "end_time",
  numberMdm = "numberMdm",
  processingMode = "processingMode",
  temperature = "temperature",
  solutionConcentration = "Кон-ция раствора и результат экспресс",
}

export type TColumnsReserch = typeof ColumnsResearch;

export const ColumnsResearch = [
  {
    name: "Номер исследования",
    key: JournalColumnKeys.researchId,
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

  {
    name: "Тест на качество",
    key: JournalColumnKeys.test,
  },
  {
    name: "Наименование средства",
    key: JournalColumnKeys.name,
  },
  {
    name: "Дата начала",
    key: JournalColumnKeys.start_time,
  },
  {
    name: "Время окончания",
    key: JournalColumnKeys.end_time,
  },

  {
    name: "Температура рабочего раствора",
    key: JournalColumnKeys.temperature,
  },
  {
    name: "Наименование средства",
    key: JournalColumnKeys.name,
  },
  {
    name: "Дата начала диз.выдержки",
    key: JournalColumnKeys.start_time,
  },
  {
    name: "Время окончания диз.выдержки",
    key: JournalColumnKeys.end_time,
  },

  {
    name: "Номер МДМ",
    key: JournalColumnKeys.numberMdm,
  },
  {
    name: "Номер режима обработки",
    key: JournalColumnKeys.processingMode,
  },
  {
    name: "Концетрация раствора",
    key: JournalColumnKeys.solutionConcentration,
  },
  {
    name: "Время начала",
    key: JournalColumnKeys.start_time,
  },
  {
    name: "Время окончания",
    key: JournalColumnKeys.end_time,
  },
  {
    name: "Отвественный",
    key: JournalColumnKeys.userId,
  },
  {
    name: "Наименование средства",
    key: JournalColumnKeys.name,
  },
];
