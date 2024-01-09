import { fetchReportJournal } from "@/lib/prisma.services";
import { TableJournal } from "./components";
import { Suspense } from "react";
import Loader from "@/components/loader";

async function JournalPage() {
  const getHistoryReseach = await fetchReportJournal();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <TableJournal data={getHistoryReseach} />
      </Suspense>
    </>
  );
}

export default JournalPage;
