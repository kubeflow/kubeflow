import { Volume } from '../../../types';

export interface JupyterLab {
  namespace: string;
  images: string[];
  image: string;
  cpu: string | number;
  memory: string | number;
  workspace?: Volume;
  datavols?: Volume[];
  extra?: string;
  environment?: any;
}

export function emptyJupyterLab(): JupyterLab {
  return {
    namespace: '',
    images: [],
    image: '',
    cpu: '',
    memory: '',
    workspace: {
      type: '',
      name: '',
      size: 1,
      path: '',
      mode: '',
      extraFields: {},
    },
    datavols: [],
    extra: '{}',
  };
}
