import { UrlItem, ChipDescriptor } from 'kubeflow';

export interface VolumesGroup {
  name: string;
  array?: (UrlItem | ChipDescriptor)[];
  info?: string;
  url?: string;
}
