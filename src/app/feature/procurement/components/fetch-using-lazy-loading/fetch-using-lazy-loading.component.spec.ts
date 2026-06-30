/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FetchUsingLazyLoadingComponent } from './fetch-using-lazy-loading.component';

describe('FetchUsingLazyLoadingComponent', () => {
  let component: FetchUsingLazyLoadingComponent;
  let fixture: ComponentFixture<FetchUsingLazyLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchUsingLazyLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchUsingLazyLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
