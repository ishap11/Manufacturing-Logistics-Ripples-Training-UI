import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Supplier, SupplierCategory, SupplierCountry, RateCard } from '../../model/supplier.model';
export type { Supplier, SupplierCategory, SupplierCountry, RateCard };

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private suppliers: Supplier[] = [
    { id: 1, supplierName: 'ABC Industries', code: 'SUP-ABC-01', email: 'orders@abcind.com', phone: '+1-555-0199', category: 'Raw Materials', city: 'Chicago', country: 'United States', status: 'Active', reliabilityScore: 94 },
    { id: 2, supplierName: 'XYZ Electronics Pvt Ltd', code: 'SUP-XYZ-02', email: 'sales@xyzelect.com', phone: '+91-22-555021', category: 'Components', city: 'Mumbai', country: 'India', status: 'Active', reliabilityScore: 91 },
    { id: 3, supplierName: 'Global Packaging Co.', code: 'SUP-GPC-03', email: 'support@globalpack.co.uk', phone: '+44-20-7946', category: 'Packaging', city: 'London', country: 'United Kingdom', status: 'Active', reliabilityScore: 98 },
    { id: 4, supplierName: 'Pacific Chemical Corp', code: 'SUP-PAC-04', email: 'info@pacificchem.jp', phone: '+81-3-555-014', category: 'Chemicals', city: 'Tokyo', country: 'Japan', status: 'Inactive', reliabilityScore: 82 },
    { id: 5, supplierName: 'Apex Logistics Supply', code: 'SUP-APX-05', email: 'procurement@apexlog.de', phone: '+49-69-55512', category: 'Logistics Equipment', city: 'Frankfurt', country: 'Germany', status: 'Active', reliabilityScore: 95 }
  ];

  private categories: SupplierCategory[] = [
    { id: 1, name: 'Raw Materials', code: 'CAT-RAW', supplierCount: 8, description: 'Basic raw materials and commodities for manufacturing' },
    { id: 2, name: 'Components', code: 'CAT-COMP', supplierCount: 5, description: 'Assembled components, chips, transistors and structural elements' },
    { id: 3, name: 'Packaging', code: 'CAT-PACK', supplierCount: 4, description: 'Boxes, plastics, wrapping, tape, and labelling materials' },
    { id: 4, name: 'Chemicals', code: 'CAT-CHEM', supplierCount: 2, description: 'Solvents, lubricants, catalysts and chemical treatments' },
    { id: 5, name: 'Logistics Equipment', code: 'CAT-LOGEQ', supplierCount: 5, description: 'Forklifts, pallets, scanners and safety wear supplies' }
  ];

  private countries: SupplierCountry[] = [
    { id: 1, name: 'United States', code: 'USA', supplierCount: 12, region: 'North America' },
    { id: 2, name: 'India', code: 'IND', supplierCount: 6, region: 'Asia-Pacific' },
    { id: 3, name: 'United Kingdom', code: 'GBR', supplierCount: 3, region: 'Europe' },
    { id: 4, name: 'Germany', code: 'DEU', supplierCount: 2, region: 'Europe' },
    { id: 5, name: 'Japan', code: 'JPN', supplierCount: 1, region: 'Asia-Pacific' }
  ];

  private rateCards: RateCard[] = [
    { id: 1, supplierName: 'ABC Industries', carrierName: 'ABC Industries', origin: 'Chicago (ORD)', destination: 'Dallas (DFW)', mode: 'Road', transitMode: 'Road', ratePerKg: 1.25, transitDays: 2, estTransitDays: 2, effectiveDate: '2026-01-01' },
    { id: 2, supplierName: 'XYZ Electronics', carrierName: 'XYZ Electronics', origin: 'Mumbai (BOM)', destination: 'Los Angeles (LAX)', mode: 'Air', transitMode: 'Air', ratePerKg: 4.80, transitDays: 4, estTransitDays: 4, effectiveDate: '2026-02-15' },
    { id: 3, supplierName: 'Global Packaging', carrierName: 'Global Packaging', origin: 'London (LHR)', destination: 'New York (JFK)', mode: 'Sea', transitMode: 'Sea', ratePerKg: 0.65, transitDays: 14, estTransitDays: 14, effectiveDate: '2026-03-01' },
    { id: 4, supplierName: 'Pacific Chemical', carrierName: 'Pacific Chemical', origin: 'Tokyo (NRT)', destination: 'San Francisco (SFO)', mode: 'Air', transitMode: 'Air', ratePerKg: 5.20, transitDays: 3, estTransitDays: 3, effectiveDate: '2026-01-10' },
    { id: 5, supplierName: 'Apex Logistics', carrierName: 'Apex Logistics', origin: 'Frankfurt (FRA)', destination: 'Chicago (ORD)', mode: 'Sea', transitMode: 'Sea', ratePerKg: 0.85, transitDays: 18, estTransitDays: 18, effectiveDate: '2026-04-01' }
  ];

  getSuppliers(): Observable<Supplier[]> {
    return of([...this.suppliers]).pipe(delay(400));
  }

  getSupplierById(id: number): Observable<Supplier | undefined> {
    const supplier = this.suppliers.find(s => s.id === id);
    return of(supplier).pipe(delay(200));
  }

  addSupplier(supplier: Omit<Supplier, 'id'>): Observable<Supplier> {
    const newSupplier = {
      ...supplier,
      id: this.suppliers.length > 0 ? Math.max(...this.suppliers.map(s => s.id)) + 1 : 1
    };
    this.suppliers.push(newSupplier);
    return of(newSupplier).pipe(delay(400));
  }

  updateSupplier(idOrSupplier: number | Supplier, updatedData?: Partial<Supplier>): Observable<Supplier | null> {
    if (typeof idOrSupplier === 'object') {
      const supplier = idOrSupplier;
      const idx = this.suppliers.findIndex(s => s.id === supplier.id);
      if (idx === -1) return of(null);
      this.suppliers[idx] = {
        ...this.suppliers[idx],
        ...supplier
      };
      return of(this.suppliers[idx]).pipe(delay(400));
    } else {
      const idx = this.suppliers.findIndex(s => s.id === idOrSupplier);
      if (idx === -1) return of(null);
      this.suppliers[idx] = {
        ...this.suppliers[idx],
        ...updatedData
      };
      return of(this.suppliers[idx]).pipe(delay(400));
    }
  }

  deleteSupplier(id: number): Observable<boolean> {
    const idx = this.suppliers.findIndex(s => s.id === id);
    if (idx === -1) return of(false);
    
    this.suppliers.splice(idx, 1);
    return of(true).pipe(delay(400));
  }

  getCategories(): Observable<SupplierCategory[]> {
    return of(this.categories).pipe(delay(300));
  }

  getCountries(): Observable<SupplierCountry[]> {
    return of(this.countries).pipe(delay(300));
  }

  getRateCards(): Observable<RateCard[]> {
    return of(this.rateCards).pipe(delay(350));
  }
}
