export enum Facility {
  name = "Наименование средства",
  concentration = "Концетрация раствора",
}
export enum JournalColumnKeys {
  researchId = "researchId",
  patientId = "patientId",
  userId = "userId",
  endoscopeId = "endoscopeId",
  date_research = "date_research",
  test = "test",
  name = "name",
  start_time = "start_time",
  end_time = "end_time",
  numberMdm = "numberMdm",
  processingMode = "processingMode",
  temperature = "temperature",
  concentration = "concentration",
}

export type TColumnsReserch = typeof ColumnsResearch;

export const ColumnsResearch = {
  research: [
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
      name: "Дата иследования",
      key: JournalColumnKeys.date_research,
    },
    {
      name: "ID эндоскопа",
      key: JournalColumnKeys.endoscopeId,
    },
    {
      name: "Тест на гермитичность",
      key: JournalColumnKeys.test,
    },
  ],

  cleaning: [
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
      name: "Отвественный",
      key: JournalColumnKeys.userId,
    },
  ],

  manual: [
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
      name: "Отвественный",
      key: JournalColumnKeys.userId,
    },
  ],

  machine: [
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
      key: JournalColumnKeys.concentration,
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
  ],
};
