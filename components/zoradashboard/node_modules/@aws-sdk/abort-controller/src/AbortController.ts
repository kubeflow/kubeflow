import { AbortController as IAbortController } from "@aws-sdk/types";

import { AbortSignal } from "./AbortSignal";

export class AbortController implements IAbortController {
  public readonly signal: AbortSignal = new AbortSignal();

  abort(): void {
    this.signal.abort();
  }
}
