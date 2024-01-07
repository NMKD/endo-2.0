"use client";
import { siteConfig } from "@/config/site";
import { UserSlice } from "@/lib/createCircleUserSlice";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignIn({
  getUser,
}: {
  getUser: (id: number) => Promise<UserSlice | null>;
}) {
  const router = useRouter();
  const [err, setError] = useState("");
  async function fetchUser(formData: FormData) {
    const id = formData.get("userId");
    if (!id) {
      return setError("Укажите свой уникальный номер");
    }
    const user = await getUser(Number(id));
    if (!user) {
      return setError("Пользователь не зарегистрирован");
    }
    setError("Все получилось!");
    ("use server");
    router.push(`${siteConfig.routes.user}${user.id}/circles`);
  }
  return (
    <>
      <h1 className="text-2xl">{!err ? "Войти в систему" : err}</h1>
      <form
        className="flex flex-col items-center justify-center py-5 gap-4"
        action={fetchUser}
      >
        <Input type="text" name="userId" placeholder="Введите свой ID" />

        <Button type="submit" color="warning">
          Войти
        </Button>
      </form>
    </>
  );
}

export default SignIn;
