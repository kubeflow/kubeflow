export interface GPUVendor {
  limitsKey: string;
  uiName: string;
  gpusCount: string[];
}

export interface GPU {
  vendor?: string;
  num?: string;
  vendors?: GPUVendor[];
}
