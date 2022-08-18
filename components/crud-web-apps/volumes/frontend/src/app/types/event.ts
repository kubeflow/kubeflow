import { EventsV1Event } from '@kubernetes/client-node';

export interface EventObject extends EventsV1Event {
  message?: string;
}
