import { Widget } from "@/widget";



export function upataWidget(jude: Widget): BuildContext {
    let context = new BuildContext();
    jude.context = context;
    let proxy = jude;
    let widget = proxy.build(context);

    context.dom = widget["__generateDOM__"]();
    return context;
}


export class BuildContext {
    dom: HTMLElement;
    constructor() {

    }
}

export function runWidget(jude: Widget): BuildContext {
    let context = new BuildContext();
    jude.context = context;
    let proxy = jude;
    let widget = proxy.build(context);

    context.dom = widget["__generateDOM__"]();
    return context;
}

export function runApp(widget: Widget, el: HTMLElement | string) {
    if (typeof el  === "string") {
        el = document.getElementById(el);
    } 
    
    let dom = runWidget(widget).dom;
    el.appendChild(dom);
}