import { load } from 'js-yaml';

export function parseYAML(text: string): [any, string] {
  if (!text) {
    return [{}, ''];
  }

  let parsed: any;
  try {
    parsed = load(text);
  } catch (e) {
    console.warn(e);
    return [{}, e];
  }

  return [parsed, ''];
}
