import { Namespace } from './namespace';
import { PlatformInfo } from './platform-info';

export interface EnvInfo {
  user?: string;
  platform?: PlatformInfo;
  namespaces?: Namespace[];
  isClusterAdmin?: boolean;
}
