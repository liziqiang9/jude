interface StyleArgs {
    margin?: string;
    color?: string;
    display?: string;
    flexDirection?: string;
    fontSize?: string;
    width?: string;
    listStyle?: string;
    position?: string;
    top?: string;
    left?: string;
    boxShadow?: string;
    background?: string;
    backgroundColor?: string;
    padding?: string;
    cursor?: string;
    fontWeight?: string;
    minWidth?: string,
    minHeight?: string,
}
export class Style {
    args: StyleArgs;
    constructor(args: StyleArgs) {
        this.args = args;
    }

    getStyleString(): string {
        let style = "";
        for (let key in this.args) {
            let match = key.match(/([A-Z])/g);
            let newKey = key;
            match?.forEach((value) => {
                newKey = newKey.replace(value, "-" + value.toLocaleLowerCase());
            })

            style += newKey + ": " + this.args[key] + ";";
        }
        return style;
    }
}

