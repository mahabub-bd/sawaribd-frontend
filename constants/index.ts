const backendUrl = process.env.NEXT_PUBLIC_API_URL;

import { AdminSidebarMenuItem, MenuItem } from "@/types";

const menuIcons = {
  home: "🏠",
  about: "ℹ️",
  portfolio: "💼",
  skill: "🎯",
  blog: "📝",
  service: "💡",
  messages: "📞",
  users: "👥",
};

const adminSidebarMenu: AdminSidebarMenuItem[] = [
  {
    id: 1,
    title: "Home",
    href: "/dashboard",
    icon: menuIcons.home,
    isAdminMenu: false,
  },

  {
    id: 2,
    title: "Documents",
    href: "/dashboard/documents",
    icon: menuIcons.blog,
    isAdminMenu: false,
  },

  {
    id: 3,
    title: "User List",
    href: "/dashboard/users",
    icon: menuIcons.users,
    isAdminMenu: true,
  },
];

const menuItems: MenuItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Skill", href: "/skill" },
  { title: "Documents", href: "/blog" },
  { title: "Service", href: "/service" },
  { title: "Contact", href: "/contact" },
];

export { adminSidebarMenu, backendUrl, menuItems };
