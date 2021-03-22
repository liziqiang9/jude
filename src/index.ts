import { Widget } from "@/widget";
import { BuildContext, runApp } from "@/core";
import { JHTMLDivElement, JHTMLElement, JHTMLSpanElement, JText, Style } from "@/html";

export { Widget };
export { BuildContext, runApp };
export { JHTMLDivElement, JText, Style, JHTMLElement };


export class MainWidget extends Widget {
    text: string;
    flag: boolean;
    constructor() {
        super();
        this.text = "123";
        this.flag = true;
    }

    onclick() {
        return () => {
            if (this.flag) {
                this.text = "12345";
            } else {
                this.text = "123";
            }

            this.flag = !this.flag;
            this.setState();
        }
    }

    build(context: BuildContext): Widget {
        return new JHTMLDivElement({
            style: new Style({ margin: "20px", color: "red" }),
            
            children: [
                new JText({ data: 'num:' + this.text }),
                new JHTMLDivElement({
                    onclick: this.onclick(),
                    style: new Style({ color: "blue" }),
                    child: new JText({ data: 'num:' + this.text }),
                }),
                new JText({ data: '   flag:' + this.flag }),
                new JHTMLSpanElement({
                    child: new JText({ data: "span" }),
                })
            ]
        });
    }
}