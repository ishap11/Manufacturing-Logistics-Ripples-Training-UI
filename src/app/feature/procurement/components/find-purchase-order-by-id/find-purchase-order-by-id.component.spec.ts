/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindPurchaseOrderByIdComponent } from './find-purchase-order-by-id.component';

describe('FindPurchaseOrderByIdComponent', () => {
  let component: FindPurchaseOrderByIdComponent;
  let fixture: ComponentFixture<FindPurchaseOrderByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPurchaseOrderByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPurchaseOrderByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
