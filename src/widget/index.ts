import { BuildContext } from "@/core";
import { JHTMLElement } from "@/html";

export class Widget {

    context: BuildContext;
    build(context: BuildContext): Widget {
        return;
    }

    setState() {
        let widget = this.build(this.context) as JHTMLElement;
        let dom = widget.__generateDOM__();
        (this.context.dom as HTMLElement).parentElement.replaceChild(dom, this.context.dom as HTMLElement);
        this.context.dom = dom;
        return true;
    }
}

export class Container extends Widget {

}

export class Row extends Widget {
    
}

export class Column extends Widget {
    
}