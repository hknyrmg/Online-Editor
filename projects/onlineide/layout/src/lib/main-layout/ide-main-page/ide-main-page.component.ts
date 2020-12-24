import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ButtonToggleModel, DropdownModel } from '@onlineide/components';
import { EditorOptions } from '../../EditorModels/editor-options.model';
import { CountDownModel } from './countdown.model';
import { SideNavToggleType } from './sidenav-toggle-type.enum';
import { SideNavType } from './sidenav.enum';

@Component({
  selector: 'ide-main-page',
  templateUrl: './ide-main-page.component.html',
  styleUrls: ['./ide-main-page.component.css']
})
export class IdeMainPageComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @Output() toggleChangeEvent = new EventEmitter<Boolean>();
  @Output() timeFinished = new EventEmitter<any>();
  @Output() editorOptionsChangeEvent = new EventEmitter<EditorOptions>();

  @Input() areIconsVisible: Boolean = true;
  public isMobileDevice: Boolean = false;
  SideNavType: typeof SideNavType = SideNavType;
  opened: boolean;
  sideNavType: SideNavType = SideNavType.over;
  sideNavToggleType: SideNavToggleType = SideNavToggleType.menu;
  @Input() headerTitle: string = "OBSS IDE"
  @Input() countDownModel: CountDownModel;

  dropFoldList: DropdownModel[] = [
    {value: "manual", decription: "Manual"},
    {value: "markbegin", decription: "Mark Begin"},
    {value: "markbeginend", decription: "Mark Begin and End"}


  ];

  dropKeyBindingList: DropdownModel[] = [
    {value: "vscode", decription: "VSCode"},
    {value: "vim", decription: "Vim"},
    {value: "emacs", decription: "Emacs"}
  ];

    //softWrapModelList
    public softWrapModelList: ButtonToggleModel[] = [
      { value: "false/'off'", buttonText: "Off" },
      { value: "true/'free'", buttonText: "Margin" },
      { value: "40", buttonText: "40" }
    ];

  // editor preferences
editorOptions: EditorOptions = new EditorOptions();

  constructor() {
    this.isMobileDevice = window.innerWidth < 767;
  }

  ngOnInit(): void {
  }

  toggleChange(slideToggleState: Boolean) {
    this.toggleChangeEvent.emit(slideToggleState);
  }

  startSideNavClick(sideNavToggleType: SideNavType) {
    if (sideNavToggleType === SideNavType.over) {
      this.sideNavType = SideNavType.over;
      this.sideNavToggleType = SideNavToggleType.menu;

    }
    else {
      this.sideNavType = SideNavType.side;
      this.sideNavToggleType = SideNavToggleType.settings;
    }
    this.sidenav.toggle();
  }
  timesUp(event) { if (event.action == "done") { 
    this.timeFinished.emit();
   } }
   fontSizeChanged(event){
     this.editorOptions.fontSize = event.target.value;
     this.editorOptionsChangeEvent.emit(this.editorOptions);
   }
   highlightChange(event){
     this.editorOptions.highlightActiveLine = event.checked;
     this.editorOptionsChangeEvent.emit(this.editorOptions);
   }
   gutterChange(event){
    this.editorOptions.showGutter = event.checked;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  lineNumbersChange(event){
    this.editorOptions.showLineNumbers = event.checked;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  liveAutoCompChange(event){
    this.editorOptions.enableLiveAutocompletion = event.checked;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  
  showInvisiblesChange(event){
    this.editorOptions.showInvisibles = event.checked;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  showPrintMarginChange(event){
    this.editorOptions.showPrintMargin = event.checked;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  dropFoldChanged(event){
    this.editorOptions.foldStyle = event.value;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }

  dropKeyBindingChanged(event){
    this.editorOptions.keybinding = event.value;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  
  wrapChanged(event){
    
    this.editorOptions.wrap =  event.value;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  printMarginColumnChanged(event){
    this.editorOptions.printMarginColumn = event.target.value;
    this.editorOptionsChangeEvent.emit(this.editorOptions);
  }
  
}
