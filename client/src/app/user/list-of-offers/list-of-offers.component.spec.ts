import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfOffersComponent } from './list-of-offers.component';

describe('ListOfOffersComponent', () => {
  let component: ListOfOffersComponent;
  let fixture: ComponentFixture<ListOfOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
