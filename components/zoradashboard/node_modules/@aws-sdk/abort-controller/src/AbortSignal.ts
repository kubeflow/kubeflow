import { AbortHandler, AbortSignal as IAbortSignal } from "@aws-sdk/types";

export class AbortSignal implements IAbortSignal {
  public onabort: AbortHandler | null = null;
  private _aborted = false;

  constructor() {
    Object.defineProperty(this, "_aborted", {
      value: false,
      writable: true,
    });
  }

  /**
   * Whether the associated operation has already been cancelled.
   */
  get aborted(): boolean {
    return this._aborted;
  }

  /**
   * @internal
   */
  abort(): void {
    this._aborted = true;
    if (this.onabort) {
      this.onabort(this);
      this.onabort = null;
    }
  }
}
