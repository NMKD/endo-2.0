import prisma from "./prisma";
import {
  filterObjectsKeys,
  getFullTodayObject,
  findOneObject,
  formatDateToTimeLocal,
} from "./utils";
import { nanoid } from "nanoid";
import { unstable_noStore as noStore } from "next/cache";

export async function getEndoscopesStore() {
  try {
    const end = await prisma.endoscope.findMany({
      include: {
        store: true,
      },
      where: {
        isActive: false,
      },
    });

    await prisma.$disconnect();

    return filterObjectsKeys(end).map((item) => {
      return {
        ...item.store[0],
        name: item.name,
        manufacturerId: item.manufacturerId,
        departmentId: item.departmentId,
        kindId: item.kindId,
      };
    });
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - getEndoscopesStore. Catch Error: ${error.message}`
    );
  }
}

export async function fetchReportJournal() {
  const today = getFullTodayObject();
  // console.log(
  //   new Date(today.year, today.month - 1, today.day + 1, 2, 59).toISOString()
  // );
  try {
    const report = await prisma.historyResearch.findMany({
      where: {
        date_research: {
          gte: new Date(
            today.year,
            today.month - 1,
            today.day,
            3,
            0
          ).toISOString(),
          lte: new Date(
            today.year,
            today.month - 1,
            today.day + 1,
            2,
            59
          ).toISOString(),
        },
      },
      include: {
        cleaning: true,
        machineCleaning: true,
        manualCleaning: true,
      },
    });
    const facilities = await prisma.facility.findMany();

    const filter = report.map((item) => {
      const clgf =
        item.cleaning.length > 0 &&
        findOneObject(facilities, item.cleaning.facilityId);
      const mlf =
        item.manualCleaning.length > 0 &&
        findOneObject(facilities, item.manualCleaning.facilityId);
      const mchf =
        item.machineCleaning.length > 0 &&
        findOneObject(facilities, item.machineCleaning.facilityId);

      return {
        research: {
          researchId: item.id,
          patientId: item.patientId,
          userId: item.userId,
          endoscopeId: item.endoscopeId,
          test: item.test ? "Пройден" : "No",
          date_research: formatDateToTimeLocal(item.date_research),
        },

        cleaning:
          item.cleaning.length > 0
            ? {
                researchId: item.id,
                test: item.cleaning.test,
                start_time: formatDateToTimeLocal(item.cleaning[0].start_time),
                end_time: formatDateToTimeLocal(item.cleaning[0].end_time),
                ...clgf,
              }
            : [],
        manualCleaning:
          item.manualCleaning.length > 0
            ? {
                researchId: item.id,
                temperature: item.manualCleaning.temperature,
                start_time: formatDateToTimeLocal(
                  item.manualCleaning[0].start_time
                ),
                end_time: formatDateToTimeLocal(
                  item.manualCleaning[0].end_time
                ),
                ...mlf,
              }
            : [],
        machineCleaning:
          item.machineCleaning.length > 0
            ? {
                researchId: item.id,
                processingMode: item.machineCleaning.processingMode,
                numberMdm: item.machineCleaning.numberMdm,
                start_time: formatDateToTimeLocal(
                  item.machineCleaning[0].start_time
                ),
                end_time: formatDateToTimeLocal(
                  item.machineCleaning[0].end_time
                ),
                ...mchf,
              }
            : [],
      };
    });
    await prisma.$disconnect();
    return filter;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - fetchReportJournal. Catch Error: ${error.message}`
    );
  }
}

export async function fetchKinds() {
  try {
    const kinds = await prisma.kind.findMany();
    await prisma.$disconnect();
    return kinds;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - fetchKinds. Catch Error: ${error.message}`
    );
  }
}

export async function fetchManufacturers() {
  try {
    const manufacturers = await prisma.manufacturer.findMany();
    await prisma.$disconnect();
    return manufacturers;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - fetchManufacturers. Catch Error: ${error.message}`
    );
  }
}

export async function fetchfacilities() {
  try {
    const facilities = await prisma.facility.findMany();
    await prisma.$disconnect();
    return facilities;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - fetchfacilities. Catch Error: ${error.message}`
    );
  }
}

export async function fetchDepartments() {
  try {
    const departments = await prisma.department.findMany();
    await prisma.$disconnect();
    return departments;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - fetchDepartments. Catch Error: ${error.message}`
    );
  }
}

export async function createBookingUser(endId, userId) {
  try {
    await prisma.endoscope.update({
      where: {
        id: endId,
      },
      data: {
        isActive: true,
      },
    });
    const store = await prisma.store.delete({
      where: {
        endoscopeId: endId,
      },
    });
    await prisma.circle.create({
      data: {
        userId,
        endoscopeId: endId,
        isBooking: true,
        isResearch: false,
        isCleanigFinal: false,
        isWashingMachine: false,
        isWashingManual: false,
      },
    });
    await prisma.$disconnect();
    return store;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - createBookingUser Catch Error: ${error.message}`
    );
  }
}

export async function getCurrentUser(userId) {
  noStore();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        circles: true,
      },
    });
    await prisma.$disconnect();
    return user;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - getCurrentUser. Catch Error: ${error.message}`
    );
  }
}

export async function createResearch(id, userId) {
  const pId = nanoid();
  try {
    const reserach = await prisma.historyResearch.create({
      data: {
        patientId: pId,
        endoscopeId: id,
        transactions: false,
        test: false,
        userId,
      },
    });
    const circle = await prisma.circle.update({
      where: {
        userId,
        endoscopeId: id,
      },
      data: {
        endoscopeId: id,
        patientId: reserach.patientId,
        historyResearchId: reserach.id,
        dateStartReserach: reserach.date_research,
        isBooking: false,
        isResearch: true,
        userId,
      },
    });
    await prisma.$disconnect();
    return circle;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - createResearch. Catch Error: ${error.message}`
    );
  }
}

export async function createCleaning(pcId) {
  try {
    const research = await prisma.historyResearch.update({
      where: {
        patientId: pcId,
      },
      data: {
        test: true,
      },
    });
    const cleaning = await prisma.historyFinalCleaning.create({
      data: {
        historyResearchId: research.id,
        facilityId: 1,
      },
    });
    const circle = await prisma.circle.update({
      where: {
        patientId: pcId,
      },
      data: {
        isResearch: false,
        isCleanigFinal: true,
        dateStartCleaningFinal: cleaning.start_time,
      },
    });
    await prisma.$disconnect();
    return circle;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - createCleaning. Catch Error: ${error.message}`
    );
  }
}

export async function createCleaningManual(pcId, hrId) {
  try {
    const cleaning = await prisma.historyManualCleaning.create({
      data: {
        historyResearchId: hrId,
        temperature: 23,
        solutionConcentration: "2.3%",
        facilityId: 2,
      },
    });
    const circle = await prisma.circle.update({
      where: {
        patientId: pcId,
      },
      data: {
        isCleanigFinal: false,
        dateStartWashingManual: cleaning.start_time,
        isWashingManual: true,
      },
    });
    await prisma.$disconnect();
    return circle;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - createCleaningManual. Catch Error: ${error.message}`
    );
  }
}

export async function createCleaningMachine(pcId, hrId) {
  try {
    const cleaning = await prisma.historyMachineCleaning.create({
      data: {
        historyResearchId: hrId,
        solutionConcentration: "2.3%",
        facilityId: 4,
        numberMdm: 4,
        processingMode: 5,
      },
    });
    const circle = await prisma.circle.update({
      where: {
        patientId: pcId,
      },
      data: {
        isCleanigFinal: false,
        dateStartWashingMachine: cleaning.start_time,
        isWashingMachine: true,
      },
    });
    await prisma.$disconnect();
    return circle;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error(
      `The database request has failed. (func) - createCleaningMachine. Catch Error: ${error.message}`
    );
  }
}

export async function createStore(ptId) {
  try {
    const circle = await prisma.circle.delete({
      where: {
        patientId: ptId,
      },
    });
    await prisma.endoscope.update({
      where: {
        isActive: true,
        id: circle.endoscopeId,
      },
      data: {
        isActive: false,
      },
    });
    await prisma.store.create({
      data: {
        endoscopeId: circle.endoscopeId,
        number_store: 4,
      },
    });
    return await prisma.$disconnect();
  } catch (error) {
    console.log(
      `The database request has failed. (func) - createStore. Catch Error: ${error.message}`
    );
    await prisma.$disconnect();
    process.exit(1);
  }
}
