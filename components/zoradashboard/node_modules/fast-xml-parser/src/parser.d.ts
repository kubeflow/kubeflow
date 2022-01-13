type X2jOptions = {
  attributeNamePrefix: string;
  attrNodeName: false | string;
  textNodeName: string;
  ignoreAttributes: boolean;
  ignoreNameSpace: boolean;
  allowBooleanAttributes: boolean;
  parseNodeValue: boolean;
  parseAttributeValue: boolean;
  arrayMode: boolean | 'strict' | RegExp | ((tagName: string, parentTagName: string) => boolean);
  trimValues: boolean;
  cdataTagName: false | string;
  cdataPositionChar: string;
  parseTrueNumberOnly: boolean;
  tagValueProcessor: (tagValue: string, tagName: string) => string;
  attrValueProcessor: (attrValue: string, attrName: string) => string;
  stopNodes: string[];
};
type X2jOptionsOptional = Partial<X2jOptions>;
type validationOptions = {
  allowBooleanAttributes: boolean;
};
type validationOptionsOptional = Partial<validationOptions>;
type J2xOptions = {
  attributeNamePrefix: string;
  attrNodeName: false | string;
  textNodeName: string;
  ignoreAttributes: boolean;
  cdataTagName: false | string;
  cdataPositionChar: string;
  format: boolean;
  indentBy: string;
  supressEmptyNode: boolean;
  tagValueProcessor: (tagValue: string) => string;
  attrValueProcessor: (attrValue: string) => string;
};
type J2xOptionsOptional = Partial<J2xOptions>;

type ESchema = string | object | Array<string|object>;

type ValidationError = {
  err: { code: string; msg: string, line: number };
};

export function parse(xmlData: string, options?: X2jOptionsOptional, validationOptions?: validationOptionsOptional | boolean): any;
export function convert2nimn(
  node: any,
  e_schema: ESchema,
  options?: X2jOptionsOptional
): any;
export function getTraversalObj(
  xmlData: string,
  options?: X2jOptionsOptional
): any;
export function convertToJson(node: any, options?: X2jOptionsOptional): any;
export function convertToJsonString(
  node: any,
  options?: X2jOptionsOptional
): string;
export function validate(
  xmlData: string,
  options?: validationOptionsOptional
): true | ValidationError;
export class j2xParser {
  constructor(options: J2xOptionsOptional);
  parse(options: any): any;
}
export function parseToNimn(
  xmlData: string,
  schema: any,
  options: Partial<X2jOptions>
): any;
