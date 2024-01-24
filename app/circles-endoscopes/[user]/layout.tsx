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
      <div className="container mx-auto px-4">
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
        <div>{children}</div>
      </div>
    </>
  );
}

export default Layout;
