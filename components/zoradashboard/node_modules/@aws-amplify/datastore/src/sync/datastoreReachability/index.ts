import { Reachability } from '@aws-amplify/core';

export const ReachabilityMonitor = new Reachability().networkMonitor();
