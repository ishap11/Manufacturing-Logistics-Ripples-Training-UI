export interface PurchaseOrder {
  id: number;
  poNumber: string;
  supplierName: string;
  orderDate: string;
  deliveryDate?: string;
  totalAmount: number;
  itemsCount?: number;
  status: string; // expanded to string for flex mock inputs
}

export interface PurchaseOrderItem {

  purchaseOrderItemIdPk: number;

  productSupplierIdFk: number;

  purchasedQuantity: number;

  unitPrice: number;

}

export interface ProcurementPurchaseOrder {

  purchaseOrderIdPk: number;

  supplierIdFk: number;

  purchaseOrderStatusIdFk: number;

  currencyIdFk: number;

  purchaseOrderDate: string;

  expectedDeliveryDate: string;

  itemList?: PurchaseOrderItem[];

}

export interface PurchaseOrderProduct {

  purchaseOrderIdPk: number;

  supplierIdFk: number;

  productName: string;

}

export interface LazyPurchaseOrder {

  purchaseOrderIdPk: number;

  supplierIdFk: number;

  productName: string[];

}