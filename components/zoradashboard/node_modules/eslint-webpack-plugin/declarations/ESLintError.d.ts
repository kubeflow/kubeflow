export default ESLintError;
declare class ESLintError extends Error {
  /**
   * @param {string=} messages
   */
  constructor(messages?: string | undefined);
}
