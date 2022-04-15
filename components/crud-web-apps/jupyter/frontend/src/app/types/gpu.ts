export interface GPUVendor {
  limitsKey: string;
  uiName: string;
}

export interface GPU {
  vendor?: string;
  num?: string;
  vendors?: GPUVendor[];

  memory?: string;
  memoryVendors?: GPUVendor[];
  memoryVendor?: string;
}
