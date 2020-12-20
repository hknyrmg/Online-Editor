import { FoldStyle } from "./fold-style.enum";

export class EditorOptions{
    fontSize: number = 12;
    enableLiveAutocompletion: boolean = true;
    highlightActiveLine: boolean = true;
    showGutter: boolean = true;
    showLineNumbers: boolean = true;
    showInvisibles: boolean = false;
    showPrintMargin: boolean = true;
    foldStyle: string = "markbegin";

}