import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDoneComponent } from './result-done.component';

describe('ResultDoneComponent', () => {
  let component: ResultDoneComponent;
  let fixture: ComponentFixture<ResultDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
