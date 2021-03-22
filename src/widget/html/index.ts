import { MultiChildRenderObjectWidget, Widget } from "../core";
import { Style } from "../style";

interface MultiChildElementArgs {
    child?: Widget;
    children?: Array<Widget>;
    onclick?: Function;
    style?: Style;
}

export class JHTMLSpanElement extends MultiChildRenderObjectWidget {
    constructor(args: MultiChildElementArgs) {
        super({ tagName: "span", ...args });
    }
}

export class JHTMLDivElement extends MultiChildRenderObjectWidget {
    constructor(args: MultiChildElementArgs) {
        super({ tagName: "div", ...args });
    }
}