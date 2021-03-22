import { Widget } from "..";
interface AppArgs {
    head?: Widget;
    body: Widget;
}
export class App extends Widget {
    constructor(args: AppArgs) {
        super({});
    }
}