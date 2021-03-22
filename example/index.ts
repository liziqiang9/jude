import { MainWidget } from "../src/myWidget"
import { runApp } from "../src"

window.onload = function () {
    runApp(new MainWidget("start"), document.getElementById("jude"));
}