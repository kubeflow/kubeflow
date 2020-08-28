export interface BackendResponse {
  namespaces?: string[];
  storageClasses?: string[];
  defaultStorageClass?: string;
  user: string;
  success: boolean;
  log?: string;
}
