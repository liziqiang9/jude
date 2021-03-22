import { Widget } from "@/widget";

/**运行上下文 */
export class BuildContext {
    dom: HTMLElement;
    widget: Widget;

    parentContext: BuildContext;
    constructor() {

    }
}

/**运行部件 */
export function runWidget(widget: Widget): BuildContext {
    let context = new BuildContext();
    widget.context = context;

    let buildWidget = widget.build(context);
    context.widget = buildWidget;
    context.dom = buildWidget["__generateDOM__"]();

    if (buildWidget["children"]) {
        for (let child of (buildWidget["children"] as Array<Widget>)) {
            let childContext = runWidget(child);
            childContext.parentContext = context;
            context.dom.appendChild(childContext.dom);
        }
    }

    return context;
}

/**运行App */
export function runApp(widget: Widget, el: HTMLElement | string) {
    if (typeof el === "string") {
        el = document.getElementById(el);
    }

    let context = runWidget(widget);
    el.appendChild(context.dom);
    return context;
}