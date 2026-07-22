export interface StoreProfile {
  storeIdPk: number;
  storeCode: string;
  storeName: string;
  managersIdFk?: number | null;
  addressIdFk?: number | null;
  storeStatusIdFk?: number | null;
  createdByUserIdFk?: number | null;
  updatedByUserIdFk?: number | null;
  managersName?: string | null;
  managersContactPhone?: string | null;
  managersEmail?: string | null;
}

export interface CreateStoreProfile {
  StoreName: string;
  ManagersIdFk?: number | null;
  AddressIdFk?: number | null;
  StoreStatusIdFk?: number | null;
  CreatedByUserIdFk?: number | null;
}

export interface UpdateStoreProfile {
  StoreName: string;
  ManagersIdFk?: number | null;
  StoreStatusIdFk?: number | null;
  UpdatedByUserIdFk?: number | null;
}

export interface ManagerOption {
  id: number;
  name: string;
}

export interface AddressOption {
  id: number;
  label: string;
}

export interface UserOption {
  id: number;
  name: string;
}