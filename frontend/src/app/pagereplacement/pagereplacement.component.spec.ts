import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagereplacementComponent } from './pagereplacement.component';

describe('PagereplacementComponent', () => {
  let component: PagereplacementComponent;
  let fixture: ComponentFixture<PagereplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagereplacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagereplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
