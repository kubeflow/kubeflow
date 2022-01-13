import { Reachability } from '@aws-amplify/core';
import { default as NetInfo } from '@react-native-community/netinfo';

export const ReachabilityMonitor = new Reachability().networkMonitor(NetInfo);
