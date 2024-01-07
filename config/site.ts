export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  navItems: [
    {
      label: "Эндоскопия",
      href: "/endoscopes",
    },
    {
      label: "Мои эндоскопы",
      href: "/user",
    },
  ],
  navMenuItems: [
    {
      label: "Эндоскопия",
      href: "/endoscopes",
    },
    {
      label: "Мои эндоскопы",
      href: "/user",
    },
    {
      label: "Log out",
      href: "/",
    },
  ],
  links: {},
  routes: {
    user: "endoscopes/",
  },
};
