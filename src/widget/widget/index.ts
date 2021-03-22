
import { MultiChildArgs, MultiChildRenderObjectWidget, Widget } from "../core";
import { Style } from "../style";

export class Container extends MultiChildRenderObjectWidget {
    constructor(args: MultiChildArgs) {
        super({ tagName: "div", ...args });
    }
}

interface RowArgs extends MultiChildArgs {
}
export class Row extends MultiChildRenderObjectWidget {
    constructor(args: RowArgs) {
        super({ tagName: "div", ...args });
    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement("div");
        if (this.style) {
            this.style.args.display = "flex";
            this.style.args.flexDirection = "row";
        } else {
            this.style = new Style({ display: "flex", flexDirection: "row" });
        }

        ele.setAttribute("style", this.style.getStyleString());

        if (this.onclick)
            ele.onclick = this.onclick as any;

        return ele;
    }
}

interface ColumnArgs extends MultiChildArgs {
}
export class Column extends MultiChildRenderObjectWidget {
    constructor(args: ColumnArgs) {
        super({ tagName: "div", ...args });
    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement("div");
        if (this.style) {
            this.style.args.display = "flex";
            this.style.args.flexDirection = "column";
        } else {
            this.style = new Style({ display: "flex", flexDirection: "column" });
        }

        ele.setAttribute("style", this.style.getStyleString());

        if (this.onclick)
            ele.onclick = this.onclick as any;

        return ele;
    }
}

interface TextWigetArgs {
    data: string;
}
export class TextWiget extends Widget {
    data: string;
    constructor(args: TextWigetArgs) {
        super({ tagName: "#text" });
        this.data = args.data;
    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement("span");
        ele.appendChild(document.createTextNode(this.data));
        return ele;
    }
}