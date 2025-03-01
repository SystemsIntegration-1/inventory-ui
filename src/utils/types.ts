export interface Batch {
  id?: string;
  productId: string;
  stock: number;
  entryDate: number;
  expirationDate: number;
}

export interface ExpiredBatch {
  batchId: string;
  productId: string;
  productName: string;
  productCategory: string;
  stock: number;
  entryDate: number;
  expirationDate: number;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  warehouseLocation: string;
  batches?: Batch[];
  totalStock?: number;  
}

export interface CreateProduct {
  name: string;
  description: string;
  category: string;
  warehouseLocation: string;
}

export interface CreateBatch {
  productId: string;
  stock: number;
  entryDate: number;
  expirationDate: number;
}

export interface InventoryMovement {
  id?: string;
  productId: string;
  movementType: string;
  quantity: number;
  movementDate: number;
  origin: string;
  destination: string;
}

export interface InventoryMovementResponse {
  success: boolean;
  message: string;
  movementId?: string;
}