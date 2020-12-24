import { Component, OnInit } from '@angular/core';
import { SurveyResult } from '@onlineide/components';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  modeSurvey = true;

  textAReaModel: any;
  constructor() { }

  ngOnInit(): void {
  }
  submitSurvey(surveyResult: SurveyResult) {
    console.log(surveyResult);
    this.modeSurvey = false;
  }
  skipSurvey() {
    this.modeSurvey = false;


  }
}
