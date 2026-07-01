export interface StoreProfile {
  Store_Id_PK: number;
  Store_Code: string;
  Store_Name: string;
  Store_Manager_Id_Fk: number | null;
  Address_Id_FK: number | null;
  Store_Status_Id_FK: number | null;
  Created_DateTime: string;
  Updated_DateTime: string;
  city: string;
  region: string;
  status: 'Active' | 'Inactive' | 'Pending';
  managerName: string;
}

export type CreateStoreProfile = Omit<StoreProfile, 'Store_Id_PK'>;
