import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

// auto-complete
import 'ace-builds/src-noconflict/ext-language_tools';

// beautify
import 'ace-builds/src-noconflict/ext-beautify';
import { ButtonToggleModel, CodeProblemFieldComponent, DialogWindowComponent, DropdownModel, solutions } from '@onlineide/components';

import { ProxyManager } from 'projects/onlineide/core/src/lib/Services/proxy-service/proxy-manager.service';
import {
  CompilerTestModel, Language, LanguageSpecificProblemDetail,
  Problem, Problems, SuccededCompile, Themes
} from '@onlineide/common';
import { AceEditorConstants } from 'src/constants/AceEditorConstants/ace-constants.model';
import { CodeProblem, UserAnswer } from '@onlineide/components';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountDownModel, EditorOptions } from '@onlineide/layout';
import { Modes } from 'projects/onlineide/common/src/lib/enums/supported-modes.enum';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent, TestResult } from '@onlineide/components';
import { RouteManagerService } from '@onlineide/core';
import { stdout } from 'process';

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
  countDownModel: CountDownModel;
  testResultText: string;

  // editor preferences
  editorOptions: EditorOptions = new EditorOptions();

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
    private _bottomSheet: MatBottomSheet,
    private _routeManager: RouteManagerService,
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
    const editorOptions = this.getEditorOptions(this.editorOptions);

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
  private getEditorOptions(editorOptions: EditorOptions): Partial<ace.Ace.EditorOptions> & { enableLiveAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: editorOptions.highlightActiveLine,
      minLines: 14,
      maxLines: Infinity,
      fontSize: editorOptions.fontSize
    };

    const extraEditorOptions = {
      enableLiveAutocompletion: editorOptions.enableLiveAutocompletion,
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
    this.codeEditor.focus();
    this.codeEditor.navigateFileEnd();
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
        this.currentProblemList = data.problems;
        this._updateCurrentDetail(this.currentProblemList[0].languageSpecificProblemDetails[0]);
        this._setTime();
        this._setSampleCode(this.currentProblemList[0].languageSpecificProblemDetails[0]);
        this.updateLanguageDropDown(this.currentProblemList[0].languageSpecificProblemDetails);
        this._updateEditorLangMode(this.currentProblemList[0].languageSpecificProblemDetails[0]);

        this._setCurrentAnswerList();

      }, (err: any) => {
        console.log(err);
      });

  }

  private _setTime() {
    let totalTime = this.currentProblemList.length * 900;
    this.countDownModel = { leftTime: totalTime };
  }

  private _updateEditorLangMode(langSpesificDetail: LanguageSpecificProblemDetail) {
    switch (langSpesificDetail.language_id) {
      case Modes.Csharp:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.CSharp);
        break;
      case Modes.Java:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.Java);

        break;
      case Modes.Ruby:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.Ruby);
        break;
      case Modes.Php:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.PHP);
        break;
      case Modes.JavaScript:
        this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.JavaScript);
        break;
        case Modes.TypeScript:
          this.codeEditor.getSession().setMode(AceEditorConstants.AceLangModes.TypeScript);
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
      // answer.language_specific_problem_detail_id = this.currentProblemList[index].problem.id;
      answer.language_specific_problem_detail_id = this.currentProblemList[index].languageSpecificProblemDetails[0].id;

      answer.language_id = this.currentProblemList[index].languageSpecificProblemDetails[0].language_id;
      answer.coding_problem_answer = "";
      this.currentAnswerList.push(answer);
    }
    this._updateQuestionShown(0);

  }

  private _setSampleCode(currentProb: LanguageSpecificProblemDetail) {
    this._setCode(currentProb.code_sample);

  }


  updateLanguageDropDown(lanGuageDetailList: LanguageSpecificProblemDetail[], langId?: number) {
    let langList: Language[] = [];
    for (let index = 0; index < lanGuageDetailList.length; index++) {
      let language: Language = new Language();
      language.id = lanGuageDetailList[index].language_id;
      language.name = lanGuageDetailList[index].language;
      langList.push(language);
    }
    if (langId) {
      this._mapDropLanguages(langList, langId)
    }
    else {
      this._mapDropLanguages(langList)
    }


  }
  private _mapDropLanguages(languageList: Language[], langId?: number) {
    this.languageModelList = languageList.map(function (langList: Language) {
      let dropdownModel: DropdownModel = new DropdownModel();
      dropdownModel.decription = langList.name;
      dropdownModel.value = langList.id.toString();
      return dropdownModel;
    });
    this.selectedLangId = langId ? langId.toString() : this.languageModelList[0].value;

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
    this._updateLangSpesId(selectedDetail.id);
  }
  private _updateLangSpesId(langSpesId: string) {
    this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].language_specific_problem_detail_id = langSpesId;
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

    this.updateLanguageDropDown(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails,
      this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].language_id);


    let langSpesificDetail: LanguageSpecificProblemDetail;
    langSpesificDetail = this.codeProblemComp.currentQuestion.languageSpecificProblemDetails.filter(x => x.id ===
      this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].language_specific_problem_detail_id)[0];
    this._updateCurrentDetail(langSpesificDetail);
    this._updateEditorLangMode(langSpesificDetail);


  }
  prevClick() {
    this._saveAnswer(this.codeProblemComp.currentQuestionNumber);

    if (this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer === "") {
      this._setSampleCode(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails[0]);
    }
    else {
      this._setCode(this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].coding_problem_answer);
    }
    this.updateLanguageDropDown(this.codeProblemComp.currentQuestion.languageSpecificProblemDetails,
      this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].language_id);

    let langSpesificDetail: LanguageSpecificProblemDetail;
    langSpesificDetail = this.codeProblemComp.currentQuestion.languageSpecificProblemDetails.filter(x => x.id ===
      this.currentAnswerList[this.codeProblemComp.currentQuestionNumber - 1].language_specific_problem_detail_id)[0];
    this._updateCurrentDetail(langSpesificDetail);
    this._updateEditorLangMode(langSpesificDetail);
  }

  updateLangDropSelected(langId: number) {
    this.selectedLangId = langId;
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
      let testResults: TestResult[] = [];
      for (let index = 0; index < data.length; index++) {
        let testResult: TestResult = new TestResult();
        testResult.IsSucceded = data[index] && data[index].stdout &&  data[index].stdout.toLowerCase() === "true";

        testResult.ResultText = data[index] && data[index].stdout && data[index].stdout.toLowerCase() === "true" ?
          `Test ${index + 1} Compiled Succesfully! ` : `An error occurred for test ${index + 1}! `;
        testResults.push(testResult);

      }
      // this.testResultText = text;
      // this.openSnackBar(this.testResultText, "OK");
      this.openBottomSheet(testResults);
      if (data && data.every(x => x.stdout &&  x.stdout === "true" )) {
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
  getLastSuccededCode() {
    if (this.succededCompileList && this.succededCompileList.find(x => x.language_specific_problem_detail_id ===
      this.currentDetail.id)) {
      let code = this.succededCompileList.filter(x => x.language_specific_problem_detail_id ===
        this.currentDetail.id)[0].source_code;
      this._setCode(code);

    }
  }
  isRestoreButtonVisible(): Boolean {
    if (this.succededCompileList && this.currentDetail &&
      this.succededCompileList.find(x => x.language_specific_problem_detail_id ===
        this.currentDetail.id)) {
      return true;
    }
    return false;
  }
  sendAnswers() {
    let solutions1: solutions = new solutions();
    solutions1.UserAnswerList = this.currentAnswerList;
    
    this._proxyService.post(AceEditorConstants.ApiEndPoints.SubmitEndPoint,
      solutions1
    ).subscribe((data: any) => {

      // console.log(data);
      // this.openResultDialog("Congrulations! Your answers has been sent.");
      this._routeManager.redirect("result");

    }, (err: any) => {

      console.log(err);
      let message = err.message ? err.message : "An error occurred!";
      this.openResultDialog(message);
    }, () => {
    });
  }
  timeFinished() {
    this.sendAnswers();
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
  openBottomSheet(testResults: TestResult[]): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: testResults,
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 15000,
    });
  }

  editorOptionsChangeEvent(editorOptions: EditorOptions) {


    this.codeEditor.setKeyboardHandler("ace/keyboard/" + editorOptions.keybinding);

    this.codeEditor.setOptions({
      fontSize: editorOptions.fontSize.toString() + "px",
      highlightActiveLine: editorOptions.highlightActiveLine,
      showGutter: editorOptions.showGutter,
      showLineNumbers: editorOptions.showLineNumbers,
      showInvisibles: editorOptions.showInvisibles,
      enableLiveAutocompletion: editorOptions.enableLiveAutocompletion,
      showPrintMargin: editorOptions.showPrintMargin,
      foldStyle: editorOptions.foldStyle,
      wrap: editorOptions.wrap === "true/'free'" ? editorOptions.printMarginColumn : editorOptions.wrap,
      printMarginColumn: editorOptions.printMarginColumn
    });

  }
}

