import { Suspense } from "react";
import {
  createCleaning,
  createCleaningMachine,
  createCleaningManual,
  createResearch,
  createStore,
  getCurrentUser,
} from "@/lib/prisma.services";
import { Endoscopes } from "./components";
import Loader from "@/components/loader";

import {
  TFnToCleaning,
  TFnToEndWashingMch,
  TFnToEndWashingMl,
  TFnToResearch,
  TFnToStore,
} from "@/interfaces";

export default async function EndoscopesOfUserPage({
  params,
}: {
  params: { user: string };
}) {
  const user = await getCurrentUser(Number(params.user));

  const toResearch: TFnToResearch = async (id, userId) => {
    "use server";
    console.log(`id endoscope: ${id}`, `user id: ${userId}`);
    return await createResearch(id, userId);
  };
  const toCleaning: TFnToCleaning = async (pcId) => {
    "use server";
    console.log(`Create history of final cleaning, patient id: ${pcId}`);
    return await createCleaning(pcId);
  };
  const toEndWashingMch: TFnToEndWashingMch = async (id, idh) => {
    "use server";
    console.log(
      `createCleaningManual, patient id: ${id}, History Research ID ${idh}`
    );
    return await createCleaningMachine(id, idh);
  };
  const toEndWashingMl: TFnToEndWashingMl = async (id, idh) => {
    "use server";
    console.log(
      `toEndWashingMch, patient id: ${id} , History Research ID ${idh}`
    );
    return await createCleaningManual(id, idh);
  };
  const toStore: TFnToStore = async (id) => {
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
