export interface GPUVendor {
  limitsKey: string;
  uiName: string;
}

export interface GPU {
  vendor?: string;
  num?: string;
  fractional?: string | number;
  fractionalMemory?: string | number;
  vendors?: GPUVendor[];
}
