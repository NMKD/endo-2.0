import prisma from "./prisma";
import { filterObjectsKeys } from "./utils";
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
    console.log(
      "Не удалось запросить данные из таблицы endoscope ошибка",
      error
    );
    return;
  }
}

export async function fetchKinds() {
  try {
    const kinds = await prisma.kind.findMany();
    return kinds;
  } catch (error) {
    console.log("Не удалось загрузит данные из справочников", error);
    return;
  }
}

export async function fetchManufacturers() {
  try {
    const manufacturers = await prisma.manufacturer.findMany();
    return manufacturers;
  } catch (error) {
    console.log("Не удалось загрузит данные из справочников", error);
    return;
  }
}

export async function fetchfacilities() {
  try {
    const facilities = await prisma.facility.findMany();
    return facilities;
  } catch (error) {
    console.log("Не удалось загрузит данные из справочников", error);
    return;
  }
}

export async function fetchDepartments() {
  try {
    const departments = await prisma.department.findMany();
    return departments;
  } catch (error) {
    console.log("Не удалось загрузит данные из справочников", error);
    return;
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
    await prisma.store.delete({
      where: {
        endoscopeId: endId,
      },
    });
    const circles = await prisma.circle.create({
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
    return circles;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCurrentUser(userId) {
  noStore();
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        circles: true,
      },
    });
  } catch (error) {
    throw new Error(
      "Dont't get data from user table for current user" + error.message
    );
  }
}

export async function createResearch(id, userId) {
  const pId = nanoid();
  console.log("creating history of Research...");
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
    const circles = await prisma.circle.update({
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
    return circles;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function createCleaning(pcId) {
  console.log("create history final cleaning...");
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
    const circles = await prisma.circle.update({
      where: {
        patientId: pcId,
      },
      data: {
        isResearch: false,
        isCleanigFinal: true,
        dateStartCleaningFinal: cleaning.start_time,
      },
    });
    return circles;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function createCleaningManual(id, hrId) {
  try {
    const cleaning = await prisma.historyManualCleaning.create({
      data: {
        historyResearchId: hrId,
        temperature: 23,
        solutionConcentration: "2.3%",
        facilityId: 2,
      },
    });
    const circles = await prisma.circle.update({
      where: {
        patientId: id,
      },
      data: {
        isCleanigFinal: false,
        dateStartWashingManual: cleaning.start_time,
        isWashingManual: true,
      },
    });
    return circles;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function createCleaningMachine(id, hrId) {
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
    const circles = await prisma.circle.update({
      where: {
        patientId: id,
      },
      data: {
        isCleanigFinal: false,
        dateStartWashingMachine: cleaning.start_time,
        isWashingMachine: true,
      },
    });
    return circles;
  } catch (error) {
    console.log(error);
    return;
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
    await prisma.$disconnect();
    return;
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
