"use server";
import { StateCreator } from "zustand";
import {
  createBookingUser,
  createCleaning,
  createCleaningMachine,
  createCleaningManual,
  createResearch,
  createStore,
  getCurrentUser,
  //   getCurrentUser,
} from "./prisma.services";
import { Circle } from "@prisma/client";
import { TNullNumber, TNullString } from "../app/interfaces.props";

export interface UserSlice {
  circles?: Circle[];
  id: number;
  name: string;
  role: string;
  departmentId: number;
}

export interface CircleUserSlice {
  user: UserSlice;
  fetchUser: (userId: TNullNumber) => Promise<void>;
  createBooking: (endId: TNullNumber, userId: TNullNumber) => Promise<void>;
  createCleaningHistory: (
    pcId: TNullString,
    endId: TNullNumber
  ) => Promise<void>;
  createResearhHistory: (
    endId: TNullNumber,
    userId: TNullNumber
  ) => Promise<void>;
  createWashingMl: (
    pcId: TNullString,
    hrId: TNullNumber,
    endId: TNullNumber
  ) => Promise<void>;
  createWashingMch: (
    pcId: TNullString,
    hrId: TNullNumber,
    endId: TNullNumber
  ) => Promise<void>;
  toEndCircle: (pcId: TNullString) => Promise<void>;
}

export const createCircleUserSlice: StateCreator<CircleUserSlice> = (
  set,
  get
) => ({
  user: {
    circles: [],
    id: 0,
    name: "",
    role: "",
    departmentId: 0,
  },
  fetchUser: async (userId) => {
    const user = await getCurrentUser(userId);
    !user ? set({ user: undefined }) : set({ user });
  },
  createBooking: async (endId, userId) => {
    const userState = get().user;

    if (userState && userState !== undefined) {
      const circlesPromise = await createBookingUser(endId, userId);
      if (circlesPromise) {
        userState?.circles?.push(circlesPromise);
      }

      set({
        user: {
          ...userState,
        },
      });
    }
  },
  createResearhHistory: async (endId, userId) => {
    const userState = get().user;
    if (userState && userState !== undefined) {
      const circlesPromise = await createResearch(endId, userId);
      if (circlesPromise) {
        set({
          user: {
            ...userState,
            circles: userState?.circles?.map((item) =>
              item.endoscopeId === endId
                ? {
                    ...item,
                    ...circlesPromise,
                  }
                : { ...item }
            ),
          },
        });
      }
    }
  },
  createCleaningHistory: async (pcId, endId) => {
    const userState = get().user;

    if (userState && userState !== undefined) {
      const circlesPromise = await createCleaning(pcId);
      if (circlesPromise) {
        set({
          user: {
            ...userState,
            circles: userState?.circles?.map((item) =>
              item.endoscopeId === endId
                ? {
                    ...item,
                    ...circlesPromise,
                  }
                : { ...item }
            ),
          },
        });
      }
    }
  },
  createWashingMl: async (pcId, hrId, endId) => {
    const userState = get().user;

    if (userState && userState !== undefined) {
      const circlesPromise = await createCleaningManual(pcId, hrId);
      if (circlesPromise) {
        set({
          user: {
            ...userState,
            circles: userState?.circles?.map((item) =>
              item.endoscopeId === endId
                ? {
                    ...item,
                    ...circlesPromise,
                  }
                : { ...item }
            ),
          },
        });
      }
    }
  },
  createWashingMch: async (pcId, hrId, endId) => {
    const userState = get().user;

    if (userState && userState !== undefined) {
      const circlesPromise = await createCleaningMachine(pcId, hrId);
      if (circlesPromise) {
        set({
          user: {
            ...userState,
            circles: userState?.circles?.map((item) =>
              item.endoscopeId === endId
                ? {
                    ...item,
                    ...circlesPromise,
                  }
                : { ...item }
            ),
          },
        });
      }
    }
  },
  toEndCircle: async (ptId) => {
    const userState = get().user;
    if (userState && userState !== undefined) {
      set({
        user: {
          ...userState,
          circles: userState?.circles?.filter(
            (item) => item.patientId !== ptId
          ),
        },
      });
    }
    await createStore(ptId);
  },
});
