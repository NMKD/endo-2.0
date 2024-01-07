import { getCurrentUser } from "@/lib/prisma.services";
import SignIn from "../components/signIn";
import { UserSlice } from "./interfaces.props";

export default function Home() {
  async function getUser(id: number): Promise<UserSlice | null>{
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
