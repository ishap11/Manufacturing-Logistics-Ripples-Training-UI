import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorePageComponent } from './store-page.component';
import { provideRouter } from '@angular/router';

describe('StorePageComponent', () => {
  let component: StorePageComponent;
  let fixture: ComponentFixture<StorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorePageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(StorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
