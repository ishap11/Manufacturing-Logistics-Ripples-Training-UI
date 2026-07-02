export interface Supplier {
  id: number;
  companyName: string;
  supplierName: string;
  age: number;
  code: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  city: string;
  country: string;
  status: 'Active' | 'Inactive';
  reliabilityScore: number;
}

export interface SupplierCategory {
  id: number;
  name: string;
  code: string;
  supplierCount: number;
  description: string;
}

export interface SupplierCountry {
  id: number;
  name: string;
  code: string;
  supplierCount: number;
  region: string;
}

export interface RateCard {
  id: number;
  supplierName: string;
  origin: string;
  destination: string;
  mode: 'Air' | 'Sea' | 'Road' | 'Rail';
  ratePerKg: number;
  transitDays: number;
  effectiveDate: string;
  carrierName?: string; // added to match properties if queried as carrierName
  transitMode?: string; // added to match properties if queried as transitMode
  estTransitDays?: number; // added to match properties if queried as estTransitDays
}
