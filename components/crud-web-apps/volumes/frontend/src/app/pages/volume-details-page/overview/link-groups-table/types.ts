export interface LinkObject {
  name: string;
  url?: string;
}

export interface LinkGroup {
  name: string;
  links: LinkObject[];
}
