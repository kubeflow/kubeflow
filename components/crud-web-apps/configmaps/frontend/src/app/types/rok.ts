import { ConfigMapResponseObject, ConfigMapProcessedObject } from './backend';
import { STATUS_TYPE } from 'kubeflow';

export interface ConfigMapResponseObjectRok extends ConfigMapResponseObject {
  viewer: STATUS_TYPE;
}

export interface ConfigMapProcessedObjectRok
  extends ConfigMapResponseObjectRok,
  ConfigMapProcessedObject {}
