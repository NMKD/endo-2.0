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
    throw new Error(
      `The database request has failed. (func) - getEndoscopesStore${error.message}`
    );
  }
}

export async function fetchKinds() {
  try {
    const kinds = await prisma.kind.findMany();
    return kinds;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - fetchKinds" + error.message
    );
  }
}

export async function fetchManufacturers() {
  try {
    const manufacturers = await prisma.manufacturer.findMany();
    return manufacturers;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - fetchManufacturers" +
        error.message
    );
  }
}

export async function fetchfacilities() {
  try {
    const facilities = await prisma.facility.findMany();
    return facilities;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - fetchfacilities" +
        error.message
    );
  }
}

export async function fetchDepartments() {
  try {
    const departments = await prisma.department.findMany();
    return departments;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - fetchDepartments" +
        error.message
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
    return store;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - createBookingUser" +
        error.message
    );
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
      "The database request has failed. (func) - getCurrentUser" + error.message
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
    return circle;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - createResearch" + error.message
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
    return circle;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - createCleaning" + error.message
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
    return circle;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - createCleaningManual" +
        error.message
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
    return circle;
  } catch (error) {
    throw new Error(
      "The database request has failed. (func) - createCleaningMachine" +
        error.message
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
      "The database request has failed. (func) - createStore" + error.message
    );
    await prisma.$disconnect();
    process.exit(1);
  }
}
