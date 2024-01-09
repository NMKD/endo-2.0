"use client";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button, Input } from "@nextui-org/react";
import { ICirclesOfUser } from "@/interfaces";
import { useRouter } from "next/navigation";

function SignIn({
  getUser,
}: {
  getUser: (id: number) => Promise<ICirclesOfUser | null>;
}) {
  const router = useRouter();
  const [messageTag, setMessageTag] = useState("");

  async function fetchUser(formData: FormData) {
    const id = formData.get("userId");

    if (!id) {
      return setMessageTag("Укажите свой уникальный номер");
    }
    const user = await getUser(Number(id));
    if (!user) {
      return setMessageTag("Пользователь не зарегистрирован");
    }
    setMessageTag("Все получилось!");
    router.push(`${siteConfig.routes.user}${user.id}`);
  }

  return (
    <>
      <h1 className="text-2xl">
        {!messageTag ? "Войти в систему" : messageTag}
      </h1>
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
