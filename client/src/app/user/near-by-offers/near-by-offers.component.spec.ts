import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByOffersComponent } from './near-by-offers.component';

describe('NearByOffersComponent', () => {
  let component: NearByOffersComponent;
  let fixture: ComponentFixture<NearByOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearByOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearByOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
