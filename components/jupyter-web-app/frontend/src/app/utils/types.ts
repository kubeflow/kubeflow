export interface Volume {
  name: string;
  size: string;
  namepsace?: string;
  class?: string;
  mode: string;
  type?: string;
  path: string;
  id?: number;
  extraFields?: any;
}

export function emptyVolume(): Volume {
  return {
    type: "",
    name: "",
    size: "",
    path: "",
    mode: "",
    extraFields: {}
  };
}

// Backend response type
export interface Resp {
  namespaces?: string[];
  notebooks?: Resource[];
  storageclasses?: string[];
  defaultStorageClass?: string;
  pvcs?: Volume[];
  config?: any;
  success: string;
  log?: string;
}

// Notebooks received from backend
export interface Resource {
  name: string;
  namespace: string;
  status: string;
  reason: string;
  age: string;
  image: string;
  volumes: string[];
  cpu: string;
  memory: string;
  shortImage: string;
}

// Types of the Configuration with default values from backend
export interface ConfigVolume {
  type: {
    value: string;
  };
  name: {
    value: string;
  };
  size: {
    value: string;
  };
  mountPath: {
    value: string;
  };
  accessModes: {
    value: string;
  };
}

export interface Config {
  image?: {
    value: string;
    options: string[];
    readOnly?: boolean;
  };
  cpu?: {
    value: string;
    readOnly?: boolean;
  };
  memory?: {
    value: string;
    readOnly?: boolean;
  };
  workspaceVolume?: {
    value: ConfigVolume;
    readOnly?: boolean;
  };
  dataVolumes?: {
    value: {
      value: ConfigVolume;
    }[];
    readOnly?: boolean;
  };
  extraResources?: {
    value: any;
    readOnly?: boolean;
  };
}

// Types of  popup
export enum SnackType {
  Success,
  Error,
  Warning,
  Info
}
