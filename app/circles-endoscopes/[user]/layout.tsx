import { Navbar } from "@/components/navbar";

import { siteConfig } from "@/config/site";
import { Link, Button } from "@nextui-org/react";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const userId = params.user;
  return (
    <>
      <Navbar {...{ userId }} />
      <div className="flex flex-row-reverse pt-8">
        <Button
          href={`${siteConfig(userId).routes.path}${params.user}/journal`}
          as={Link}
          color="success"
          showAnchorIcon
          variant="solid"
        >
          Журнал регистрации
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center ">
        {children}
      </div>
    </>
  );
}

export default Layout;
