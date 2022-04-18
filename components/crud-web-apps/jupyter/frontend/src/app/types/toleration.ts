export interface Toleration {
  key: string;
  operator: string;
  value: string;
  effect: string;
  tolerationSeconds?: bigint;
}

export interface TolerationGroup {
  groupKey: string;
  displayName: string;
  tolerations: Toleration[];
}
