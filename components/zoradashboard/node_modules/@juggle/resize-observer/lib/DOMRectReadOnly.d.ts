interface Rectangle {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
declare type DOMRectJSON = {
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
};
declare class DOMRectReadOnly {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly top: number;
    readonly left: number;
    readonly bottom: number;
    readonly right: number;
    constructor(x: number, y: number, width: number, height: number);
    toJSON(): DOMRectJSON;
    static fromRect(rectangle: Rectangle): Readonly<DOMRectReadOnly>;
}
export { DOMRectReadOnly };
