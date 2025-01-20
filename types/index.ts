export enum Role {
  User = "user",
  Admin = "admin",
  Moderator = "moderator",
}

export interface User {
  _id: string;
  name: string;
  token?: string;
  email: string;
  createdAt: string;
  role: Role;
}

export interface Attachment {
  _id: string;
  filename: string;
  mimeType: string;
  path: string;
}

export interface MenuItem {
  title: string;
  href: string;
}

export interface AdminSidebarMenuItem {
  id: number;
  title: string;
  href: string;
  icon: string;
  isAdminMenu: boolean;
}
export interface NavLink {
  id: number;
  path: string;
  text: string;
  subMenu?: boolean;
}

export interface CustomLinkProps {
  path: string;
  children: React.ReactNode;
}
