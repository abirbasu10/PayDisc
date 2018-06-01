import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersHereComponent } from './offers-here.component';

describe('OffersHereComponent', () => {
  let component: OffersHereComponent;
  let fixture: ComponentFixture<OffersHereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersHereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
