/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/loader";
import { EndoscopeFormat } from "@/lib/interface.data";

import {
  fetchKinds,
  fetchManufacturers,
  fetchDepartments,
  getEndoscopesStore,
  getCurrentUser,
  // getCurrentUser,
  // createBookingUser,
} from "@/lib/prisma.services";

import { formatDataEndoscopes } from "@/lib/utils";
import { Suspense } from "react";
import TableData from "./components/table/table";

export default async function EndoscopesPage() {
  const endoscopes = await getEndoscopesStore();
  const departments = await fetchDepartments();
  const kinds = await fetchKinds();
  const manufacturers = await fetchManufacturers();

  const dataEndoscopes: EndoscopeFormat[] = formatDataEndoscopes(
    departments,
    endoscopes,
    kinds,
    manufacturers
  );
  const user: any = await getCurrentUser(1);
  return (
    <div className="max-w-7xl pt-16">
      <Suspense fallback={<Loader />}>
        <TableData
          {...{ user }}
          dataEndoscopes={dataEndoscopes.length > 0 ? dataEndoscopes : []}
        />
      </Suspense>
    </div>
  );
}
