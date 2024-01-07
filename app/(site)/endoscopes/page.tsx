import { TableData } from "@/app/(site)/endoscopes/components";
import Loader from "@/app/components/loader";
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
  const user = await getCurrentUser(1);
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
