import { Widget } from "@/widget";

interface StyleArgs {
    margin?: string;
    color?: string;
}
export class Style {
    args: StyleArgs;
    constructor(args: StyleArgs) {
        this.args = args;
    }

    getStyleString(): string {
        let style = "";
        for (let key in this.args) {
            style += key + ": " + this.args[key] + ";";
        }
        return style;
    }
}

interface JHTMLElementArgs {
    tagName: string;
}
export class JHTMLElement extends Widget {
    args: JHTMLElementArgs;
    constructor(args: JHTMLElementArgs) {
        super();
        this.args = args;
    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement(this.args.tagName);
        return ele;
    }

    __diff__(widget: Widget) {

    }

    setState() {
        let widget = this.build(this.context) as JHTMLElement;
        let dom = widget.__generateDOM__();
        (this.context.dom as HTMLElement).parentElement.replaceChild(dom, this.context.dom as HTMLElement);
        this.context.dom = dom;
        return true;
    }
}

interface JTextArgs {
    data: string;
}
export class JText extends Widget {
    data: string;
    constructor(args: JTextArgs) {
        super();
        this.data = args.data;
    }

    __generateDOM__(): Text {
        return document.createTextNode(this.data);
    }

    __diff__(widget: Widget) {
        if (widget instanceof JText) {
            if (widget.data !== this.data) {

            }
        }
    }
}

interface DoubleTagElementArgs {
    tagName: string;
    child?: Widget;
    children?: Array<Widget>;
    onclick?: Function;
    style?: Style;
}
interface ChildDoubleTagElementArgs {
    child?: Widget;
    children?: Array<Widget>;
    onclick?: Function;
    style?: Style;
}
class DoubleTagHTMLElement extends JHTMLElement {

    children: Array<Widget>;
    onclick: Function;
    style: Style;
    constructor(args: DoubleTagElementArgs) {
        super({ tagName: args.tagName });
        if (args.child) {
            this.children = [args.child];
        } else if (args.children) {
            this.children = args.children;
        } else {
            this.children = [];
        }
        if (args.onclick)
            this.onclick = args.onclick;

        if (args.style)
            this.style = args.style;
    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement(this.args.tagName);
        if (this.style) {
            ele.setAttribute("style", this.style.getStyleString());
        }

        if (this.onclick)
            ele.onclick = this.onclick as any;

        for (let child of (this.children as Array<JHTMLElement>)) {
            ele.appendChild(child.__generateDOM__());
        }
        return ele;
    }
}

interface SingleTagElementArgs {
    tagName: string;
    onclick?: Function;
    style?: Style;
}
class SingleTagHTMLElement extends JHTMLElement {
    static isSingleTag(tagName: string) {
        switch (tagName) {
            case "hr":
                return true;
        }
        return false;
    }
    onclick: Function;
    style: Style;
    constructor(args: SingleTagElementArgs) {
        super({ tagName: args.tagName });
        if (args.onclick)
            this.onclick = args.onclick;

        if (args.style)
            this.style = args.style;
    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement(this.args.tagName);
        if (this.style) {
            ele.setAttribute("style", this.style.getStyleString());
        }

        if (this.onclick)
            ele.onclick = this.onclick as any;

        return ele;
    }
}

export class JHTMLSpanElement extends DoubleTagHTMLElement {
    constructor(args: ChildDoubleTagElementArgs) {
        super({ tagName: "span", ...args });
    }
}

export class JHTMLDivElement extends DoubleTagHTMLElement {
    constructor(args: ChildDoubleTagElementArgs) {
        super({ tagName: "div", ...args });
    }
}