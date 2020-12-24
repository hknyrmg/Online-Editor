import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SurveyResult } from '../models/SurveyModels/SurveyResult.model';

@Component({
  selector: 'ide-result-survey',
  templateUrl: './result-survey.component.html',
  styleUrls: ['./result-survey.component.css']
})
export class ResultSurveyComponent implements OnInit {
  @Output() submitSurveyEvent = new EventEmitter<any>();
  @Output() skipSurveyEvent = new EventEmitter<SurveyResult>();
  public starRate: any;
  public comment: string;

  constructor() { }

  ngOnInit(): void {
  }
  submitSurvey() {
    let result: SurveyResult = new SurveyResult();
    result.star_count = this.starRate;
    result.suggestion_text = this.comment;
    this.submitSurveyEvent.emit(result);
  }
  skipSurvey() {
    this.skipSurveyEvent.emit();
  }
}
