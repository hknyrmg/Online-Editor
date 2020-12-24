import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSurveyComponent } from './result-survey.component';

describe('ResultSurveyComponent', () => {
  let component: ResultSurveyComponent;
  let fixture: ComponentFixture<ResultSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
