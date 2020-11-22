import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeMainPageComponent } from './ide-main-page.component';

describe('IdeMainPageComponent', () => {
  let component: IdeMainPageComponent;
  let fixture: ComponentFixture<IdeMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
