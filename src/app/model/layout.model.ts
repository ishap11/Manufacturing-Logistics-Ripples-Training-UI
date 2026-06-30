export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  hasChildren?: boolean;
}

export interface SidebarGroup {
  name: string;
  items?: SidebarItem[];
}

export interface SubSidebarLink {
  label: string;
  route: string;
  icon: string;
}
