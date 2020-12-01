import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeProblemFieldComponent } from './code-problem-field.component';

describe('CodeProblemFieldComponent', () => {
  let component: CodeProblemFieldComponent;
  let fixture: ComponentFixture<CodeProblemFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeProblemFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeProblemFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
