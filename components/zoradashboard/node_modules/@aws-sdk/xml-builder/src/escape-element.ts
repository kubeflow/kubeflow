/**
 * Escapes characters that can not be in an XML element.
 */
export function escapeElement(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
