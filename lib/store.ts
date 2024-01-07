import { create } from "zustand";
import {
  createCircleUserSlice,
  CircleUserSlice,
} from "./createCircleUserSlice";
// import { persist } from "zustand/middleware";

type StoreState = CircleUserSlice;

export const useAppStore = create<StoreState>()((...rest) => ({
  ...createCircleUserSlice(...rest),
}));
