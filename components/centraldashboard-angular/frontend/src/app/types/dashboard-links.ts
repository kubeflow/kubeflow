export interface DashboardLinks {
  menuLinks: MenuLink[];
  externalLinks?: any[];
  quickLinks?: Link[];
  documentationItems?: Link[];
}

export interface MenuLink {
  type: string;
  link: string;
  text: string;
  icon: string;
}

export interface Link {
  text: string;
  desc: string;
  link: string;
}
