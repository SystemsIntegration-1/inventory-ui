export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  availableQuantity: number;
  warehouseLocation: string;
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
