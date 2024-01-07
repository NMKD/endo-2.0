/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createCleaning,
  createCleaningMachine,
  createCleaningManual,
  createResearch,
  createStore,
  getCurrentUser,
} from "@/lib/prisma.services";
import { Endoscopes } from "./components";
import { Suspense } from "react";
import Loader from "@/app/components/loader";
import { TNullNumber, TNullString } from "../interfaces.props";

export default async function EndoscopesOfUserPage() {
  const user: any = await getCurrentUser(1);
  console.log(user);

  const toResearch = async (
    id: TNullNumber,
    userId: TNullNumber
  ): Promise<void> => {
    "use server";
    await createResearch(id, userId);
    console.log(`id endoscope: ${id}`, `user id: ${userId}`);
  };
  const toCleaning = async (id: TNullString): Promise<void> => {
    "use server";
    await createCleaning(id);
    console.log(`Create history of final cleaning, pass patient id: ${id}`);
  };
  const toEndWashingMch = async (
    id: TNullString,
    idh: TNullNumber
  ): Promise<void> => {
    "use server";
    await createCleaningMachine(id, idh);
    console.log(`createCleaningManual, patient id: ${id}, ${idh}`);
  };
  const toEndWashingMl = async (
    id: TNullString,
    idp: TNullNumber
  ): Promise<void> => {
    "use server";
    await createCleaningManual(id, idp);
    console.log(`toEndWashingMch, patient id: ${id} ${idp}`);
  };
  const toStore = async (id: TNullString): Promise<void> => {
    "use server";
    await createStore(id);
    console.log(`id endoscope: ${id}`);
  };
  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div>
          <h1 className="text-2xl text-center font-bold">Трекинг эндоскопов</h1>
          <Suspense fallback={<Loader />}>
            {!user ? (
              <p>
                Данные не найдены, обратитесь к своему системному администратору
              </p>
            ) : (
              <Endoscopes
                {...{
                  user,
                  toResearch,
                  toCleaning,
                  toStore,
                  toEndWashingMch,
                  toEndWashingMl,
                }}
              />
            )}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
