import { V1ObjectMeta } from '@kubernetes/client-node';
export interface K8sObject {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: any;
  status?: any;
}
