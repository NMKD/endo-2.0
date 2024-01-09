export type SiteConfig = typeof siteConfig;

export const siteConfig = (userId: string) =>
  [
    {
      navItems: [
        {
          label: "Эндоскопия",
          href: `/circles-endoscopes/${userId}/`,
        },
        {
          label: "Мои эндоскопы",
          href: `/circles-endoscopes/${userId}/circles`,
        },
      ],
      navMenuItems: [
        {
          label: "Эндоскопия",
          href: `/circles-endoscopes/${userId}/`,
        },
        {
          label: "Мои эндоскопы",
          href: `/circles-endoscopes/${userId}/circles`,
        },
        {
          label: "Log out",
          href: "/",
        },
      ],
      routes: {
        path: "/circles-endoscopes/",
      },
    },
  ][0];
