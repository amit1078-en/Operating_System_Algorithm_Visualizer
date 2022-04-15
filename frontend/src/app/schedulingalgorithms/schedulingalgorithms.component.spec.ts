import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingalgorithmsComponent } from './schedulingalgorithms.component';

describe('SchedulingalgorithmsComponent', () => {
  let component: SchedulingalgorithmsComponent;
  let fixture: ComponentFixture<SchedulingalgorithmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingalgorithmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingalgorithmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
