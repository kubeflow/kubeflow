const fallbackWindow = {} as Window;

/**
 * Locates the global scope for a browser or browser-like environment. If
 * neither `window` nor `self` is defined by the environment, the same object
 * will be returned on each invocation.
 */
export function locateWindow(): Window {
  if (typeof window !== "undefined") {
    return window;
  } else if (typeof self !== "undefined") {
    return self;
  }

  return fallbackWindow;
}
