import { Volume } from 'src/app/types';

export interface JupyterLabMetadata {
  namespace?: string;
  image?: string;
  cpu?: string | number;
  memory?: string | number;
  workspaceUrl?: string;
  datavolsUrls?: string[];
  environment?: any;
}

export function emptyJupyterLab(): JupyterLabMetadata {
  return {
    namespace: '',
    image: '',
    cpu: '',
    memory: '',
    datavolsUrls: [],
  };
}

export interface RokVolumeSnapshotMetadata {
  name?: string;
  size?: string;
  path?: string;
}
