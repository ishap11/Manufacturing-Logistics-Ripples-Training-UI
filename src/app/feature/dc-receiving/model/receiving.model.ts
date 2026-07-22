export interface ShipmentProduct {
  id: number;
  productId: string;
  productName: string;
  orderedQty: number;
}

export interface Shipment {
  id: number;
  shipmentId: string;
  products: ShipmentProduct[];
}

export interface Warehouse {
  id: number;
  code: string;
  name: string;
}

export interface AvailableProduct {
  id: string;
  name: string;
}

export interface ReceivingItem {
  productId: string;
  productName?: string;
  orderedQty: number;
  receivedQty: number;
  damagedQty: number;
  qcStatus: string;
  isManual?: boolean;
}

export interface Receiving {
  receivingId: string;
  shipment: string;
  warehouse: string;
  totalProducts: number;
  totalQuantity: number;
  status: string;
  createdDate: string;
  items: ReceivingItem[];
}

// Table Configuration Interfaces
export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'status' | 'custom';
  sortable?: boolean;
}

export interface TableFilterOption {
  label: string;
  value: string;
}

export interface TableConfig {
  columns: TableColumn[];
  searchable?: boolean;
  searchPlaceholder?: string;
  filterable?: boolean;
  filterOptions?: TableFilterOption[];
  filterDefaultValue?: string;
  showAddButton?: boolean;
  addButtonLabel?: string;
  showActions?: boolean;
  actions?: ('view' | 'edit' | 'delete')[];
}
