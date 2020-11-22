import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeftSidebarComponent } from './main-left-sidebar.component';

describe('MainLeftSidebarComponent', () => {
  let component: MainLeftSidebarComponent;
  let fixture: ComponentFixture<MainLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLeftSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
