export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isActive?: boolean;
}

export interface User {
  name: string;
  role: string;
  avatar?: string;
}