import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';

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
import { CompilerTestModel, Language, LanguageSpecificProblemDetail, Problem, Problems, SuccededCompile, Themes } from '@onlineide/common';
import { AceEditorConstants } from 'src/constants/AceEditorConstants/ace-constants.model';
import { CodeProblem, UserAnswer } from 'projects/onlineide/components/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { LangModes } from 'projects/onlineide/common/src/lib/enums/supported-modes.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

//const THEME = 'ace/theme/monokai';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('codeEditor2', { static: true }) codeEditorElmRef: ElementRef;
  @ViewChild('codeProblemComp')
  codeProblemComp: CodeProblemFieldComponent;

  currentDetail: LanguageSpecificProblemDetail;



  testResultText: string;

  // public currentProblemList: CodeProblem[];
  public currentProblemList: Problems[];
  public currentAnswerList: UserAnswer[] = [];

  //Succeded Compile List
  public succededCompileList: SuccededCompile[] = [];


  LANG = AceEditorConstants.AceLangModes.JavaScript;

  private codeEditor: ace.Ace.Editor;
  private editorBeautify;

  constructor(private _cdRef: ChangeDetectorRef,
    private _proxyService: ProxyManager,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {


        this._updatePageLeaveCount();

      }
      else {
        // 
      }
    });

  }




  textAReaModel: string;

  // Language List variables
  public languageModelList: DropdownModel[];
  public dropDownTitleVar = "Languages";
  selectedLangId: any;

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
    this.codeEditor.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');

    this._cdRef.detectChanges();
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
    let value = code ? code : "";
    this.codeEditor.setValue(value);
  }
  runCode() {
    this.textAReaModel = this._getCode();
  }
  clearCode() {
    this.codeEditor.setValue(undefined);
  }


  getRandomQuestion() {
    this._proxyService.get(undefined,
      AceEditorConstants.ApiEndPoints.CodingProblem).subscribe((data: any) => {
        console.log(data);
        this.currentProblemList = data.problems;
        this._setSampleCode(this.currentProblemList[0].languageSpecificProblemDetails[0]);
        this._setCurrentAnswerList();
        this._updateQuestionShown(0);
        this.updateLanguageDropDown(this.currentProblemList[0].languageSpecificProblemDetails);
        this._updateCurrentDetail(this.currentProblemList[0].languageSpecificProblemDetails[0]);
        this._updateEditorLangMode(this.currentProblemList[0].languageSpecificProblemDetails[0]);


      }, (err: any) => {
        console.log(err);
      });

  }

  private _updateEditorLangMode(langSpesificDetail: LanguageSpecificProblemDetail) {
    switch (langSpesificDetail.language_id) {
      case LangModes.Csharp:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.CSharp);
        break;
      case LangModes.Java:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.Java);

        break;
      case LangModes.Ruby:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.Ruby);
        break;
      case LangModes.Php:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.PHP);
        break;
      case LangModes.JavaScript:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.JavaScript);
        break;
      default:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.JavaScript);

        break;
    }
  }
  private _updateCurrentDetail(langSpesificDetail: LanguageSpecificProblemDetail) {
    this.currentDetail = langSpesificDetail;

  }
  private _setCurrentAnswerList() {
    for (let index = 0; index < this.currentProblemList.length; index++) {
      let answer: UserAnswer = new UserAnswer();
      answer.coding_problem_id = this.currentProblemList[index].problem.id;
      answer.language_id = this.currentProblemList[index].languageSpecificProblemDetails[0].language_id;
      answer.coding_problem_answer = "";
      this.currentAnswerList.push(answer);
    }
  }

  private _setSampleCode(currentProb: LanguageSpecificProblemDetail) {
    this._setCode(currentProb.code_sample);

  }


  updateLanguageDropDown(lanGuageDetailList: LanguageSpecificProblemDetail[]) {
    let langList: Language[] = [];
    for (let index = 0; index < lanGuageDetailList.length; index++) {
      let language: Language = new Language();
      language.id = lanGuageDetailList[index].language_id;
      language.name = lanGuageDetailList[index].language;
      langList.push(language);
    }
    this._mapDropLanguages(langList);

  }
  private _mapDropLanguages(languageList: Language[]) {
    this.languageModelList = languageList.map(function (langList: Language) {
      let dropdownModel: DropdownModel = new DropdownModel();
      dropdownModel.decription = langList.name;
      dropdownModel.value = langList.id.toString();
      return dropdownModel;
    });
    this.selectedLangId = this.languageModelList[0].value;
  }
  themeChanged() {

  }
  dropChanged(selectedDrop) {
    console.log(selectedDrop);
    this.selectedLangId = selectedDrop.value;
    let selectedDetail = this.codeProblemComp.currentQuestion.languageSpecificProblemDetails.filter(x => x.language_id.toString() === selectedDrop.value)[0];
    this._updateCurrentDetail(selectedDetail);
    this._updateEditorLangMode(selectedDetail);
    this._setSampleCode(selectedDetail);
    this._updateCurrentAnswerListLangId(+selectedDetail.language_id);
  }

  private _updateCurrentAnswerListLangId(langId: number) {
    this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].language_id = langId;
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
    let answer = this._getCode() ? this._getCode() : "";
    this.currentAnswerList[index].coding_problem_answer = answer;
  }

  nextClick() {
    this._saveAnswer(this.codeProblemComp.currentQuestionNumber - 2);
    this._updateQuestionShown(this.codeProblemComp.currentQuestionNumber - 1);

    if (this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer === "") {
      this._setSampleCode(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails[0]);
    }
    else {
      this._setCode(this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer);
    }

    this.updateLanguageDropDown(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails);
    this._updateCurrentDetail(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails[0]);
    this._updateEditorLangMode(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails[0]);



  }
  prevClick() {
    this._saveAnswer(this.codeProblemComp.currentQuestionNumber);

    if (this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer === "") {
      this._setSampleCode(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails[0]);
    }
    else {
      this._setCode(this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer);
    }
    this.updateLanguageDropDown(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails);
    this._updateCurrentDetail(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails[0]);
    this._updateEditorLangMode(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails[0]);

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
      if (result) {
        this.sendAnswers();
      }
    });
  }

  testCode() {
    let compTestModel: CompilerTestModel = new CompilerTestModel();
    compTestModel.language_specific_problem_detail_id = this.currentDetail.id;
    compTestModel.source_code = this._getCode();
    this._proxyService.post(AceEditorConstants.ApiEndPoints.DefaultTests,
      compTestModel
    ).subscribe((data: any) => {
      this.testResultText = data[0] && data[0].stdout ? `Task ${this.codeProblemComp.currentQuestionNumber.toString()} Compiled Succesfully!` : "An error occurred!";
      this.openSnackBar(this.testResultText, "OK");
      if (data[0] && data[0].stdout) {
        this.updateSuccededCompileList(compTestModel);
      }
    }, (err: any) => {

      console.log(err);
      let message = err.message ? err.message : "An error occurred!";
      this.testResultText = message;
      this.openSnackBar(this.testResultText, "OK");

      // this.openResultDialog(message);
    }, () => {
    });

  }

  updateSuccededCompileList(compileTest: CompilerTestModel) {
    if (this.succededCompileList &&
      this.succededCompileList.find(x => x.language_specific_problem_detail_id ===
        compileTest.language_specific_problem_detail_id)) {
      this.succededCompileList.filter(x => x.language_specific_problem_detail_id ===
        compileTest.language_specific_problem_detail_id)[0].source_code = compileTest.source_code;
    }
    else {
      let sucComp = new SuccededCompile();
      sucComp.source_code = compileTest.source_code;
      sucComp.language_specific_problem_detail_id = compileTest.language_specific_problem_detail_id;
      this.succededCompileList.push(sucComp);
    }
  }
  getLastSuccededCode(){
    if(this.succededCompileList && this.succededCompileList.find(x => x.language_specific_problem_detail_id ===
      this.currentDetail.id) ){
        let code = this.succededCompileList.filter(x => x.language_specific_problem_detail_id ===
          this.currentDetail.id)[0].source_code;
        this._setCode(code);

      }
  }
isRestoreButtonVisible(): Boolean{
  if(this.succededCompileList && this.currentDetail &&
     this.succededCompileList.find(x => x.language_specific_problem_detail_id ===
    this.currentDetail.id) ){
    return true;
    }
  return false;
}
  sendAnswers() {
    this._proxyService.post(AceEditorConstants.ApiEndPoints.SubmitEndPoint,
      this.currentAnswerList
    ).subscribe((data: any) => {

      console.log(data);
      this.openResultDialog("Congrulations! Your answers has been sent.");
    }, (err: any) => {

      console.log(err);
      let message = err.message ? err.message : "An error occurred!";
      this.openResultDialog(message);
    }, () => {
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


  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {

    this._updatePasteCount();
  }



  private _updatePageLeaveCount() {
    this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].page_leave_count += 1;
  }
  private _updatePasteCount() {
    this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].ctrl_v_count += 1;
  }

  private _updateQuestionShown(index: number) {
    this.currentAnswerList[index].is_question_shown = true;
  }
  public questionCopied(event) {
    console.log(event);
    this.currentAnswerList[event - 1].is_question_copied = true;

  }
  public modeToggleChange(slideToggleState: Boolean) {
    switch (slideToggleState) {
      case true:
        this.codeEditor.setTheme(AceEditorConstants.AceThemes.XCodeTheme);
        break;
      case false:
        this.codeEditor.setTheme(AceEditorConstants.AceThemes.DarkTheme);
        break;

      default:
        this.codeEditor.setTheme(AceEditorConstants.AceThemes.DarkTheme);
        break;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 7000,
    });
  }
}

