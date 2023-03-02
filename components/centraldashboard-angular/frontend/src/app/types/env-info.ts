export interface envInfo {
  user?: string;
  platform?: {
    provider?: string;
    providerName?: string;
    buildLabel?: string;
    buildVersion?: string;
    buildId?: string;
  };
  namespaces?: {
    user?: string;
    namespace?: string;
    role?: string;
  }[];
  isClusterAdmin?: boolean;
}
