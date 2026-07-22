/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddPurchaseOrderWithItemsComponent } from './add-purchase-order-with-items.component';

describe('AddPurchaseOrderWithItemsComponent', () => {
  let component: AddPurchaseOrderWithItemsComponent;
  let fixture: ComponentFixture<AddPurchaseOrderWithItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseOrderWithItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseOrderWithItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
