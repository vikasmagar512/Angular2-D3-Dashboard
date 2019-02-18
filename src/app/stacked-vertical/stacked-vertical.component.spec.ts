import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedVerticalComponent } from './stacked-vertical.component';

describe('StackedVerticalComponent', () => {
  let component: StackedVerticalComponent;
  let fixture: ComponentFixture<StackedVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
