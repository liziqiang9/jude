import { runWidget } from "@/core";
import { BuildContext, Style } from "@/index";

interface WidgetArgs {

}
export class Widget {
    context: BuildContext;
    constructor(args: WidgetArgs) {

    }
    build(context: BuildContext): Widget {
        return this;
    }

    setState() {
        let context = this.context;
        let newContext = runWidget(this);

        (context.dom as HTMLElement).parentElement.replaceChild(newContext.dom, context.dom as HTMLElement);
        return true;
    }
}

interface SingleChildRenderObjectWidgetArgs extends WidgetArgs {
    tagName: string;
    /*样式 */
    style?: Style;
    /*事件 */
    onclick?: Function;
}
/**单孩子部件 */
export class SingleChildRenderObjectWidget extends Widget {
    tagName: string;
    style: Style;
    onclick: Function;
    constructor(args: SingleChildRenderObjectWidgetArgs) {
        super(args);
        this.tagName = args.tagName;
        if (args.onclick)
            this.onclick = args.onclick;

        if (args.style)
            this.style = args.style;
        if (args.onclick)
            this.onclick = args.onclick;

        if (args.style)
            this.style = args.style;
    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement(this.tagName);
        if (this.style) {
            ele.setAttribute("style", this.style.getStyleString());
        }

        if (this.onclick)
            ele.onclick = this.onclick as any;

        return ele;
    }
}

export interface MultiChildArgs extends WidgetArgs {
    /*样式 */
    style?: Style;

    /*孩子 */
    child?: Widget;
    children?: Array<Widget>;

    /*事件 */
    onclick?: Function;
    oncontextmenu?: Function;
    onhover?: [Function, Function];
}
interface MultiChildRenderObjectWidgetArgs extends MultiChildArgs {
    tagName: string;
}
/**多孩子部件 */
export class MultiChildRenderObjectWidget extends Widget {
    tagName: string;
    style: Style;
    children: Array<Widget>;
    onclick: Function;
    oncontextmenu: Function;
    onhover: [Function, Function];
    constructor(args: MultiChildRenderObjectWidgetArgs) {
        super(args);
        this.tagName = args.tagName;
        if (args.onclick)
            this.onclick = args.onclick;
        if (args.oncontextmenu)
            this.oncontextmenu = args.oncontextmenu;
        if (args.onhover)
            this.onhover = args.onhover;

        if (args.style)
            this.style = args.style;

        if (args.child) {
            this.children = [args.child];
        } else if (args.children) {
            this.children = args.children;
        } else {
            this.children = [];
        }

    }

    __generateDOM__(): HTMLElement {
        let ele = document.createElement(this.tagName);
        if (this.style) {
            let _this = this;
            let fun = function fun<T extends Style>(obj: T): T {
                return new Proxy(obj, {
                    get(target, key) {
                        return target[key];
                    },
                    set(target, key, value) {
                        target[key] = value;
                        _this.context.dom.setAttribute("style", target.getStyleString());
                        return true;
                    }
                })
            }
            this.style = fun(this.style);
            ele.setAttribute("style", this.style.getStyleString());
        }

        if (this.onclick)
            ele.onclick = this.onclick as any;
        if (this.oncontextmenu)
            ele.oncontextmenu = this.oncontextmenu as any;
        if (this.onhover) {
            ele.onmouseover = () => this.onhover[0](this);
            ele.onmouseout = () => this.onhover[1](this);
        }

        return ele;
    }

    __generateChildDOM__(): Array<HTMLElement> {
        let eleChild = [];
        for (let child of (this.children as Array<Widget>)) {
            eleChild.push(child["__generateDOM__"]());
        }
        return eleChild;
    }
}