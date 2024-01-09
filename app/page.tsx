import { getCurrentUser } from "@/lib/prisma.services";
import SignIn from "../components/signIn";
import { ICirclesOfUser } from "@/interfaces";

export default function Home() {
  async function getUser(id: number): Promise<ICirclesOfUser | null> {
    "use server";
    return await getCurrentUser(id);
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <SignIn {...{ getUser }} />
      </div>
    </main>
  );
}
