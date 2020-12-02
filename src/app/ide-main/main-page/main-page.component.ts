import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

// auto-complete
import 'ace-builds/src-noconflict/ext-language_tools';

// beautify
import 'ace-builds/src-noconflict/ext-beautify';
import { ButtonToggleModel, CodeProblemFieldComponent, DialogWindowComponent, DropdownModel } from '@onlineide/components';

import { ProxyManager } from 'projects/onlineide/core/src/lib/Services/proxy-service/proxy-manager.service';
import { ApiCallsMainPage } from 'src/constants/ApiCalls/MainEditor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Language } from '@onlineide/common';
import { Themes } from 'projects/onlineide/common/src/public-api';
import { AceEditorConstants } from 'src/constants/AceEditorConstants/ace-constants.model';
import { CodeProblem, UserAnswer } from 'projects/onlineide/components/src/public-api';
import { MatDialog } from '@angular/material/dialog';

//const THEME = 'ace/theme/monokai';
const LANG = 'ace/mode/javascript';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('codeEditor2', { static: true }) codeEditorElmRef: ElementRef;
  @ViewChild('codeProblemComp')
  codeProblemComp: CodeProblemFieldComponent;

  public currentProblemList: CodeProblem[];
  public currentAnswerList: UserAnswer[] = [];

  private codeEditor: ace.Ace.Editor;
  private editorBeautify;

  constructor(private _cdRef: ChangeDetectorRef,
    private _proxyService: ProxyManager, private http: HttpClient,
    public dialog: MatDialog) {


  }



  textAReaModel: string;

  // Language List variables
  public languageList: Language[];
  public languageModelList: DropdownModel[];
  public dropDownTitleVar = "Languages";
  selectedValue: any = "1";

  // Theme variables
  public buttonModelList: ButtonToggleModel[] = [
    { value: Themes.Github.toString(), buttonText: "Github Theme" },
    { value: Themes.Chrome.toString(), buttonText: "Chrome Theme" },
    { value: Themes.Dark.toString(), buttonText: "Dark Theme" }
  ];
  public selectedButtonValue = Themes.Dark.toString();

  ngOnInit() {
    this._setAceBasePath();
    ace.require('ace/ext/language_tools');

    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();

    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(AceEditorConstants.AceThemes.DarkTheme);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');
    this.getLanguageList();

    this.getRandomQuestion();



  }

  private _setAceBasePath() {
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
  }
  // missing propery on EditorOptions 'enableBasicAutocompletion' so this is a wolkaround still using ts
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableLiveAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity,
    };

    const extraEditorOptions = {
      enableLiveAutocompletion: true,
      enableSnippets: true
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }

  public beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }
  }
  private _getCode(): string {
    const code = this.codeEditor.getValue();
    return code;
  }
  private _setCode(code: string) {
    this.codeEditor.setValue(code);
  }
  runCode() {
    this.textAReaModel = this._getCode();
  }
  clearCode() {
    this.codeEditor.setValue(undefined);
  }
  // getLanguageList() {
  //   this._proxyService.get(undefined,
  //     ApiCallsMainPage.MainEditorPageLanguage.Actions.Languages).subscribe((data: any) => {
  //       console.log(data);
  //       this.languageList = data;
  //       this._mapDropLanguages(this.languageList);
  //     }, (err: any) => {
  //       console.log(err);
  //     })

  // }

  getRandomQuestion() {
    this._proxyService.get(undefined,
      'coding-problem/language/62').subscribe((data: CodeProblem[]) => {
        this.currentProblemList = data;
        this._setSampleCode(this.currentProblemList[0]);
        this._setCurrentAnswerList();
      }, (err: any) => {
        console.log(err);
      });

    // this.currentProblemList = this.dummyDataList;
    // this._setSampleCode(this.currentProblemList[0]);
    // this._setCurrentAnswerList();
  }

  private _setCurrentAnswerList() {
    for (let index = 0; index < this.currentProblemList.length; index++) {
      let answer: UserAnswer = new UserAnswer();
      answer.coding_problem_id = this.currentProblemList[index].coding_problem_id;
      answer.language_id = this.currentProblemList[index].language_id;
      answer.coding_problem_answer = "";
      this.currentAnswerList.push(answer);
    }
  }

  private _setSampleCode(currentProb: CodeProblem) {
    this._setCode(currentProb.code_sample);

  }


  getLanguageList() {
    this.languageList = [{ id: 1, name: 'JavaScript' },
    { id: 2, name: 'C#' },
    { id: 3, name: 'Java' }];
    this._mapDropLanguages(this.languageList);

  }
  private _mapDropLanguages(languageList: Language[]) {
    this.languageModelList = this.languageList.map(function (langList: Language) {
      let dropdownModel: DropdownModel = new DropdownModel();
      dropdownModel.decription = langList.name;
      dropdownModel.value = langList.id.toString();
      return dropdownModel;
    });
  }
  themeChanged() {

  }
  dropChanged(selectedDrop) {
    console.log(selectedDrop);
    this.selectedValue = selectedDrop.value;
  }
  buttonChanged(clickedButton) {
    this.selectedButtonValue = clickedButton.value;

    switch (this.selectedButtonValue) {
      case Themes.Github.toString():
        this.codeEditor.setTheme(AceEditorConstants.AceThemes.GithubTheme);

        break;
      case Themes.Chrome.toString():
        this.codeEditor.setTheme(AceEditorConstants.AceThemes.ChromeTheme);

        break;
      case Themes.Dark.toString():
        this.codeEditor.setTheme(AceEditorConstants.AceThemes.DarkTheme);

        break;
      default:
        this.codeEditor.setTheme(AceEditorConstants.AceThemes.GithubTheme);

        break;
    }
  }

  private _saveAnswer(index: number) {
    this.currentAnswerList[index].coding_problem_answer = this._getCode();
  }

  nextClick() {
    this._saveAnswer(this.codeProblemComp.currentQuestionNumber - 2);

    if (this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer === "") {
      this._setSampleCode(this.codeProblemComp.currentQuestion);
    }
    else {
      this._setCode(this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer);
    }
  }
  prevClick() {
    this._saveAnswer(this.codeProblemComp.currentQuestionNumber);

    if (this.currentAnswerList[this.codeProblemComp.currentQuestionNumber -1].coding_problem_answer === "") {
      this._setSampleCode(this.codeProblemComp.currentQuestion);
    }
    else {
      this._setCode(this.currentAnswerList[this.codeProblemComp.currentQuestionNumber -1].coding_problem_answer);
    }
  }
  sendClick() {
    // mevcut cevap kaydi
    this._saveAnswer(this.codeProblemComp.currentQuestionNumber - 1);


    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      width: '350px',
      data: { dialogContent: "Your answers will be submitted. Are you sure?", areActionButtonsVisible: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.sendAnswers();
      }
    });
  }

  sendAnswers(){
    this._proxyService.post('compile-test',
      this.currentAnswerList
      ).subscribe((data: any) => {
       console.log(data);
       this.openResultDialog("Congrulations! Your answers has been sent.");
      }, (err: any) => {
        console.log(err);
        let message = err.message ? err.message : "An error occurred!";
        this.openResultDialog(message);
      }); 
  }
  openResultDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      width: '350px',
      // data: { dialogContent: "Congrulations! Your answers has been sent.", areActionButtonsVisible: false }
      data: { dialogContent: message, areActionButtonsVisible: false }

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

 
}

