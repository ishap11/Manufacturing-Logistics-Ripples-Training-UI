import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Supplier, SupplierCategory, SupplierCountry, RateCard } from '../../model/supplier.model';
export type { Supplier, SupplierCategory, SupplierCountry, RateCard };

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private readonly storageKey = 'supplierDetails';

  private readonly defaultSuppliers: Supplier[] = [
    { id: 1, companyName: 'Madurai Textiles', supplierName: 'Karthik Subramanian', age: 41, code: 'SUP-MDU-01', email: 'orders@maduraitextiles.in', phone: '+91-98410-11223', address: '12 West Masi Street, Madurai', category: 'Textiles', city: 'Madurai', country: 'India', status: 'Active', reliabilityScore: 94 },
    { id: 2, companyName: 'Coimbatore Machine Works', supplierName: 'Meenakshi Raman', age: 38, code: 'SUP-CBE-02', email: 'sales@cbemachineworks.in', phone: '+91-98765-44321', address: '45 Avinashi Road, Coimbatore', category: 'Components', city: 'Coimbatore', country: 'India', status: 'Active', reliabilityScore: 91 },
    { id: 3, companyName: 'Kochi Packaging Hub', supplierName: 'Anish Varghese', age: 44, code: 'SUP-COK-03', email: 'support@kochipackaging.in', phone: '+91-97470-55667', address: '8 Marine Drive, Kochi', category: 'Packaging', city: 'Kochi', country: 'India', status: 'Active', reliabilityScore: 96 },
    { id: 4, companyName: 'Bengaluru Industrial Supplies', supplierName: 'Lakshmi Narayan', age: 35, code: 'SUP-BLR-04', email: 'info@blrindustrial.in', phone: '+91-99800-77889', address: '27 Peenya Industrial Area, Bengaluru', category: 'Raw Materials', city: 'Bengaluru', country: 'India', status: 'Active', reliabilityScore: 89 }
  ];

  private suppliers: Supplier[] = this.loadSuppliers();

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
    this.saveSuppliers();
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
    this.saveSuppliers();
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
      this.saveSuppliers();
      return of(this.suppliers[idx]).pipe(delay(400));
    } else {
      const idx = this.suppliers.findIndex(s => s.id === idOrSupplier);
      if (idx === -1) return of(null);
      this.suppliers[idx] = {
        ...this.suppliers[idx],
        ...updatedData
      };
      this.saveSuppliers();
      return of(this.suppliers[idx]).pipe(delay(400));
    }
  }

  deleteSupplier(id: number): Observable<boolean> {
    const idx = this.suppliers.findIndex(s => s.id === id);
    if (idx === -1) return of(false);
    
    this.suppliers.splice(idx, 1);
    this.saveSuppliers();
    return of(true).pipe(delay(400));
  }

  getSuppliersByCity(city: string): Observable<Supplier[]> {
    const normalizedCity = city.trim().toLowerCase();
    const suppliers = this.suppliers.filter(s => s.city.toLowerCase() === normalizedCity);
    return of(suppliers).pipe(delay(300));
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

  private loadSuppliers(): Supplier[] {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [...this.defaultSuppliers];
    }

    const storedSuppliers = localStorage.getItem(this.storageKey);
    if (!storedSuppliers) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaultSuppliers));
      return [...this.defaultSuppliers];
    }

    try {
      return JSON.parse(storedSuppliers) as Supplier[];
    } catch {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaultSuppliers));
      return [...this.defaultSuppliers];
    }
  }

  private saveSuppliers(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.suppliers));
    }
  }
}
