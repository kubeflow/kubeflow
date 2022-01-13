import { RetryableTrait } from "./retryable-trait";

/**
 * Type that is implemented by all Smithy shapes marked with the
 * error trait.
 */
export interface SmithyException {
  /**
   * The shape ID name of the exception.
   */
  readonly name: string;

  /**
   * Whether the client or server are at fault.
   */
  readonly $fault: "client" | "server";

  /**
   * The service that encountered the exception.
   */
  readonly $service?: string;

  /**
   * Indicates that an error MAY be retried by the client.
   */
  readonly $retryable?: RetryableTrait;
}
