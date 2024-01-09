import { Suspense } from "react";
import Loader from "@/components/loader";
import { IEndoscopeFormatTable, TFnToBooking } from "@/interfaces";
import {
  fetchKinds,
  fetchManufacturers,
  fetchDepartments,
  getEndoscopesStore,
  createBookingUser,
} from "@/lib/prisma.services";

import { formatDataEndoscopes } from "@/lib/utils";
import TableData from "./components/table/table";

export default async function EndoscopesPage({
  params,
}: {
  params: { user: string };
}) {
  const endoscopes = await getEndoscopesStore();
  const departments = await fetchDepartments();
  const kinds = await fetchKinds();
  const manufacturers = await fetchManufacturers();

  const dataEndoscopes: IEndoscopeFormatTable[] = formatDataEndoscopes(
    departments,
    endoscopes,
    kinds,
    manufacturers
  );

  const toBooking: TFnToBooking = async (endId, userId) => {
    "use server";
    console.log(`booking... user id: ${userId}, endoscope id: ${endId}`);
    const store = await createBookingUser(endId, userId);
    if (store) {
      return store;
    }
  };

  return (
    <div className="max-w-7xl pt-16">
      <Suspense fallback={<Loader />}>
        <TableData
          {...{ toBooking }}
          paramsUserId={params.user}
          dataEndoscopes={dataEndoscopes.length > 0 ? dataEndoscopes : []}
        />
      </Suspense>
    </div>
  );
}
