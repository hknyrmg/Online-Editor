import { FoldStyle } from "./fold-style.enum";

export class EditorOptions {
    fontSize: number = 12;
    enableLiveAutocompletion: boolean = true;
    highlightActiveLine: boolean = true;
    showGutter: boolean = true;
    showLineNumbers: boolean = true;
    showInvisibles: boolean = false;
    showPrintMargin: boolean = true;
    foldStyle: string = "markbegin";
    keybinding: string = "vscode";
    wrap: string = "false/'off'";
    wrap2: string = "false/'off'";

    printMarginColumn: number = 80;
}