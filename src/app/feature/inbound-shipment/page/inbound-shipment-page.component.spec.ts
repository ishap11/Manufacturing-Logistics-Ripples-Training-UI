import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboundShipmentPageComponent } from './inbound-shipment-page.component';
import { provideRouter } from '@angular/router';

describe('InboundShipmentPageComponent', () => {
  let component: InboundShipmentPageComponent;
  let fixture: ComponentFixture<InboundShipmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboundShipmentPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(InboundShipmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
