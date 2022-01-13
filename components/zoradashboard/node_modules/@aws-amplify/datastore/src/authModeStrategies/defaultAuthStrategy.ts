import { AuthModeStrategy } from '../types';

// Default behavior is to use the primary auth mode for an API,
// so we are returning an empty array so that DataStore will default
// to using the primary auth mode.
export const defaultAuthStrategy: AuthModeStrategy = () => [];
