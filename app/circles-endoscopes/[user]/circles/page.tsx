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
import Loader from "@/components/loader";
import { TNullNumber, TNullString } from "../../../interfaces.props";
import { Circle } from "@prisma/client";

export default async function EndoscopesOfUserPage({
  params,
}: {
  params: { user: string };
}) {
  const user = await getCurrentUser(Number(params.user));

  const toResearch = async (
    id: TNullNumber,
    userId: TNullNumber
  ): Promise<Circle | undefined> => {
    "use server";
    console.log(`id endoscope: ${id}`, `user id: ${userId}`);
    const circlesUser = await createResearch(id, userId);
    if (circlesUser) {
      return circlesUser;
    }
  };
  const toCleaning = async (pcId: TNullString): Promise<Circle | undefined> => {
    "use server";
    console.log(`Create history of final cleaning, patient id: ${pcId}`);
    return await createCleaning(pcId);
  };
  const toEndWashingMch = async (
    id: TNullString,
    idh: TNullNumber
  ): Promise<Circle | undefined> => {
    "use server";
    console.log(
      `createCleaningManual, patient id: ${id}, History Research ID ${idh}`
    );
    return await createCleaningMachine(id, idh);
  };
  const toEndWashingMl = async (
    id: TNullString,
    idh: TNullNumber
  ): Promise<Circle | undefined> => {
    "use server";
    console.log(
      `toEndWashingMch, patient id: ${id} , History Research ID ${idh}`
    );
    return await createCleaningManual(id, idh);
  };
  const toStore = async (id: TNullString): Promise<void> => {
    "use server";
    console.log(`To end circle, endoscope ID: ${id}`);
    await createStore(id);
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
