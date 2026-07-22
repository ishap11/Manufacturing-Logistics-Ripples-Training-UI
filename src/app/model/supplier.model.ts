export interface Supplier {
  supplierId: number;
  companyName: string;
  contactPerson: string;
  age: number;
  phone: string;
  email: string;
  supplierType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export type SupplierCreate = Omit<Supplier, 'supplierId'>;
export type SupplierUpdate = Supplier;

export interface SupplierCategory { id: number; name: string; code: string; supplierCount: number; description: string; }
export interface SupplierCountry { id: number; name: string; code: string; supplierCount: number; region: string; }
export interface RateCard { id: number; supplierName: string; origin: string; destination: string; mode: 'Air' | 'Sea' | 'Road' | 'Rail'; ratePerKg: number; transitDays: number; effectiveDate: string; carrierName?: string; transitMode?: string; estTransitDays?: number; }
