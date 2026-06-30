/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindAllPurchaseOrdersComponent } from './find-all-purchase-orders.component';

describe('FindAllPurchaseOrdersComponent', () => {
  let component: FindAllPurchaseOrdersComponent;
  let fixture: ComponentFixture<FindAllPurchaseOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAllPurchaseOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAllPurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
