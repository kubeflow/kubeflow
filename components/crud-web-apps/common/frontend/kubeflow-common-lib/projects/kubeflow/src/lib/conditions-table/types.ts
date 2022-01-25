export interface Condition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface ConditionIR extends Condition {
  statusPhase?: string;
  statusMessage?: string;
}
