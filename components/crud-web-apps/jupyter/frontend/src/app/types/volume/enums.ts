/*
 * https://v1-18.docs.kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#volume-v1-core
 */
export enum NEW_VOLUME_TYPE {
  EMPTY = 'Empty',
  CUSTOM = 'Custom',
}

export enum EXISTING_VOLUME_TYPE {
  PVC = 'pvc',
  CUSTOM = 'custom',
}

export enum EXISTING_SOURCE {
  AWS_ELASTIC_BLOCK_STORE = 'awsElasticBlockStore',
  AZURE_DISK = 'azureDisk',
  AZURE_FILE = 'azureFile',
  CEPHFS = 'cephfs',
  CINDER = 'cinder',
  CONFIG_MAP = 'configMap',
  CSI = 'csi',
  DOWNWARD_API = 'downwardAPI',
  EMPTY_DIR = 'emptyDir',
  FC = 'fc',
  FLEX_VOLUME = 'flexVolume',
  FLOCKER = 'flocker',
  GCE_PERSISTENT_DISK = 'gcePersistentDisk',
  GIT_REPO = 'gitRepo',
  GLUSTERFS = 'glusterfs',
  HOST_PATH = 'hostPath',
  ISCSI = 'iscsi',
  NFS = 'nfs',
  PERSISTENT_VOLUME_CLAIM = 'persistentVolumeClaim',
  PHOTON_PERSISTENT_DISK = 'photonPersistentDisk',
  PORTWORX_VOLUME = 'portworxVolume',
  PROJECTED = 'projected',
  QUOBYTE = 'quobyte',
  RBD = 'rbd',
  SCALE_IO = 'scaleIO',
  SECRET = 'secret',
  STORAGEOS = 'storageos',
  VSPHERE_VOLUME = 'vsphereVolume',
}
