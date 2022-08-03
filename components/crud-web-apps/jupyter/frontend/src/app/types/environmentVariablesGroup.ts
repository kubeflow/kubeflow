import { PodDefault } from 'src/app/types';
import { VariablesGroup } from 'kubeflow';

export interface EnvironmentVariablesGroup extends VariablesGroup {
  configuration?: PodDefault;
}
