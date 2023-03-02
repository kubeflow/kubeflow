import { K8sObject } from './kubernetes.model';
import { Condition } from '../conditions-table/types';

export function getCondition(obj: K8sObject, condition: string): Condition {
  let cs: Condition[] = [];
  try {
    cs = obj.status.conditions;
  } catch (err) {
    console.warn('No Conditions are found');
    return undefined;
  }

  if (!cs) {
    return undefined;
  }

  for (const c of cs) {
    if (c.type !== condition) {
      continue;
    }

    return c;
  }
}
