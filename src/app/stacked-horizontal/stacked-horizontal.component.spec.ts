import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedHorizontalComponent } from './stacked-horizontal.component';

describe('StackedHorizontalComponent', () => {
  let component: StackedHorizontalComponent;
  let fixture: ComponentFixture<StackedHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
