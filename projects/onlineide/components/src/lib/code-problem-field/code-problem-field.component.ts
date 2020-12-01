import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeProblem } from '../models/CodeProblemModels/CodeProblem';

@Component({
  selector: 'ide-code-problem-field',
  templateUrl: './code-problem-field.component.html',
  styleUrls: ['./code-problem-field.component.css']
})
export class CodeProblemFieldComponent implements OnInit {
  @Input() codeProblemList: CodeProblem[];
  @Output() nextClickEvent = new EventEmitter<any>();
  @Output() prevClickEvent = new EventEmitter<any>();
  @Output() sendClickEvent = new EventEmitter<any>();

  public currentQuestion: CodeProblem;
  public currentQuestionNumber: number = 1;

  constructor() { }

  ngOnInit(): void {
    console.log(this.currentQuestion);
    this._setCurrentQuestion();
  }

  private _setCurrentQuestion() {
    this.currentQuestion = this.codeProblemList[0];
  }

  prevClick(){
    this.currentQuestionNumber -= 1;
    this.currentQuestion = this.codeProblemList[this.currentQuestionNumber -1];
    this.prevClickEvent.emit();
  }
  nextClick(){
    this.currentQuestionNumber += 1;
    this.currentQuestion = this.codeProblemList[this.currentQuestionNumber -1];
    this.nextClickEvent.emit();

  }
  sendClick(){
    this.sendClickEvent.emit();

  }
}
