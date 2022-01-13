import { Stringable } from "./stringable";
/**
 * Represents an XML node.
 */
export declare class XmlNode {
    private name;
    readonly children: Stringable[];
    private attributes;
    constructor(name: string, children?: Stringable[]);
    withName(name: string): XmlNode;
    addAttribute(name: string, value: any): XmlNode;
    addChildNode(child: Stringable): XmlNode;
    removeAttribute(name: string): XmlNode;
    toString(): string;
}
