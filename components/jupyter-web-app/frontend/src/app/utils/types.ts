export interface Volume {
  name: string;
  size: string;
  namepsace?: string;
  class?: string;
  mode: string;
  type?: string;
  path: string;
  extraFields?: any;
  templatedName?: string;
}

export function emptyVolume(): Volume {
  return {
    type: "",
    name: "",
    size: "",
    path: "",
    mode: "",
    extraFields: {},
    templatedName: ""
  };
}

export interface PodDefault {
  label: string;
  desc: string;
}

// Backend response type
export interface Resp {
  namespaces?: string[];
  notebooks?: Resource[];
  storageclasses?: string[];
  defaultStorageClass?: string;
  pvcs?: Volume[];
  config?: any;
  poddefaults?: PodDefault[];
  success: boolean;
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
  shm?: {
    value: boolean;
    readOnly?: boolean;
  };
  configurations?: {
    value: string[];
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
