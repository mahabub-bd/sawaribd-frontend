const backendUrl = process.env.NEXT_PUBLIC_API_URL;

import { AdminSidebarMenuItem, Brand, MenuItem } from "@/types";

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

const brands: Brand[] = [
  { id: "all", name: "All Brands" },
  { id: "honda", name: "Honda" },
  { id: "yamaha", name: "Yamaha" },
  { id: "suzuki", name: "Suzuki" },
  { id: "tvs", name: "TVS" },
  { id: "bazaz", name: "Bazaz" },
  { id: "lifan", name: "Lifan" },
  { id: "bajaj", name: "Bajaj" },
  { id: "royal-enfield", name: "Royal Enfield" },
  { id: "hero", name: "Hero" },
  { id: "zontes", name: "Zontes" },
  { id: "haojue", name: "Haojue" },
  { id: "runner", name: "Runner" },
  { id: "ktm", name: "KTM" },
  { id: "aprilia", name: "Aprilia" },
  { id: "kawasaki", name: "Kawasaki" },
  { id: "benelli", name: "Benelli" },
  { id: "keeway", name: "Keeway" },
  { id: "taro", name: "Taro" },
  { id: "vespa", name: "Vespa" },
  { id: "roadmaster", name: "Roadmaster" },
  { id: "h-power", name: "H Power" },
  { id: "speeder", name: "Speeder" },
  { id: "fkm", name: "FKM" },
  { id: "gpx", name: "GPX" },
  { id: "zenin", name: "Zenin" },
  { id: "php", name: "PHP" },
  { id: "cfmoto", name: "CFMoto" },
  { id: "bmw", name: "BMW" },
];

export { adminSidebarMenu, backendUrl, brands, menuItems };
