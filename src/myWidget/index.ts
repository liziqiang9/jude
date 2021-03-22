import { Widget, TextWiget, Container, Row, Column, BuildContext, Style } from "@/index";
import { App } from "@/widget/app";

export class BilibiliApp extends Widget {
    build(context: BuildContext): Widget {
        return new App({
            body: new Container({
                children: [
                    new Container({
                        style: new Style({
                            minWidth: "999px",
                            minHeight: "56px",
                        })
                    })
                ]
            })
        })
    }
}

export class MainWidget extends Widget {
    text: string;
    flag: boolean;
    f: FloatAuxiliaryToolWidget;
    constructor(text: string) {
        super({});
        this.text = text;
        this.flag = true;
        this.f = new FloatAuxiliaryToolWidget({})
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
            this.f.close();
        }
    }
    oncontextmenu() {
        return (e: MouseEvent) => {
            e.preventDefault();
            this.f.open(e.clientX, e.clientY);
        }
    }
    build(context: BuildContext): Widget {
        return new Container({
            style: new Style({ margin: "20px", color: "red" }),
            oncontextmenu: this.oncontextmenu(),

            children: [
                new Row({
                    onclick: this.onclick(),
                    children: [
                        new Column({
                            style: new Style({ color: "#f2f233" }),
                            children: [
                                new TextWiget({ data: 'num: 12' }),
                                new TextWiget({ data: 'num: 23' }),
                                new TextWiget({ data: 'num: 34' }),
                            ]
                        }),
                        new Column({
                            style: new Style({ color: "#f222ff" }),
                            children: [
                                new TextWiget({ data: 'num: 12' }),
                                new TextWiget({ data: 'num: 23' }),
                                new TextWiget({ data: 'num: 34' }),
                            ]
                        }),
                        new Column({
                            style: new Style({ color: "#22f233" }),
                            children: [
                                new TextWiget({ data: 'num: 12' }),
                                new TextWiget({ data: 'num: 23' }),
                                new TextWiget({ data: 'num: 34' }),
                            ]
                        }),
                    ]
                }),
                new TextWiget({ data: 'num:' + this.text }),
                new Container({

                    style: new Style({ color: "blue" }),
                    child: new TextWiget({ data: 'num:' + this.text }),
                }),
                new TextWiget({ data: '   flag:' + this.flag }),
                new Container({
                    child: new TextWiget({ data: "span2" }),
                }),
                this.f
            ]
        });
    }
}

export class FloatAuxiliaryToolWidget extends Widget {
    constructor(args: any) {
        super(args);
    }

    onhover(): [Function, Function] {
        let style_1 = new Style({
            padding: "6px 25px",
            cursor: "pointer",
            fontWeight: "400"
        });
        let newStyle_1 = new Style({
            padding: "6px 25px",
            cursor: "pointer",
            backgroundColor: "#f4f4f4",
            color: "#1abc9c",
            fontWeight: "600",
        });
        return [(_this) => { _this.style.args = newStyle_1.args; }, (_this) => { _this.style.args = style_1.args; }]
    }

    build(context: BuildContext): Widget {
        let style = new Style({
            padding: "6px 25px",
            cursor: "pointer",
            fontWeight: "400"
        });
        return new Container({
            style: new Style({
                fontSize: "14px",
                width: "180px",
                listStyle: "none",
                position: "fixed",
                top: "100px",
                left: "100px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 12px 0px",
                background: "#fff",
                padding: "8px 0 6px",
                color: "#444"
            }),
            child: new Column({
                children: [
                    new Container({
                        style: style,
                        onhover: this.onhover(),
                        onclick: this.search(),
                        child: new TextWiget({ data: "使用百度搜索" })
                    }),
                    new Container({
                        style: new Style({
                            margin: "4px 0",
                            background: "#e5e5e5",
                            padding: "1px 0 0"
                        })
                    }),
                    new Container({
                        style: style,
                        onhover: this.onhover(),
                        onclick: this.cut(),
                        child: new TextWiget({ data: "剪切" })
                    }),
                    new Container({
                        style: style,
                        onhover: this.onhover(),
                        onclick: this.copy(),
                        child: new TextWiget({ data: "复制" })
                    }),
                    new Container({
                        style: style,
                        onhover: this.onhover(),
                        onclick: this.paste(),
                        child: new TextWiget({ data: "粘贴" })
                    }),
                ]
            })
        });
    }

    /**显示浮窗 */
    open(x: number, y: number) {
        this.context.dom.style.display = "inherit";
        this.context.dom.style.top = y.toString() + 'px';
        this.context.dom.style.left = x.toString() + 'px';
    }

    /**隐藏浮窗 */
    close() {
        this.context.dom.style.display = "none";
    }


    /**搜索 */
    private search() {
        return (e: MouseEvent) => {
            e.preventDefault();
            let text = window.getSelection().toString();
            this.close();
            window.open("https://www.baidu.com/s?ie=UTF-8&wd=" + text);
            return false;
        }
    }

    /**复制 */
    private copy() {
        return () => {
            this.close();
            document.execCommand('Copy');
        }
    }

    /**剪贴 */
    private cut() {
        return () => {
            this.close();
            document.execCommand('Cut');
        }

    }

    /**贴贴 */
    private paste() {
        return () => {
            this.close();
            document.execCommand('Paste');
        }
    }
}