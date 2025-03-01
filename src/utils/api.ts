import axios from "axios";
import { 
  Batch, 
  CreateBatch, 
  CreateProduct,
  ExpiredBatch, 
  InventoryMovement, 
  InventoryMovementResponse, 
  Product 
} from "./types";
import { API_URL } from "./constants";

export const getProducts = async () => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await axios.get<Product>(`${API_URL}/products/${id}`);
  return response.data;
};

export const searchProducts = async (name: string) => {
  const response = await axios.get<Product[]>(
    `${API_URL}/products/search?name=${name}`
  );
  return response.data;
};

export const addProduct = async (product: CreateProduct) => {
  const response = await axios.post<Product>(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: string, product: CreateProduct) => {
  await axios.put(`${API_URL}/products/${id}`, product);
};

export const getBatchesByProduct = async (productId: string) => {
  const response = await axios.get<Batch[]>(`${API_URL}/batches/product/${productId}`);
  return response.data;
};

export const addBatch = async (batch: CreateBatch) => {
  const response = await axios.post(`${API_URL}/batches`, batch);
  return response.data;
};

export const updateBatch = async (id: string, batch: Batch) => {
  await axios.put(`${API_URL}/batches/${id}`, batch);
};

export const getExpiredBatches = async () => {
  const response = await axios.get<ExpiredBatch[]>(`${API_URL}/batches/expired`);
  return response.data;
};

export const clearExpiredBatches = async () => {
  const response = await axios.post(`${API_URL}/batches/clear-expired`);
  return response.data;
};

export const getMovements = async (productId: string) => {
  const response = await axios.get<InventoryMovement[]>(
    `${API_URL}/inventory/movements/${productId}`
  );
  return response.data;
};

export const getAllMovements = async () => {
  const response = await axios.get<InventoryMovement[]>(
    `${API_URL}/inventory/movements`
  );
  return response.data;
};

export const registerMovement = async (movement: InventoryMovement) => {
  const response = await axios.post<InventoryMovementResponse>(
    `${API_URL}/inventory/movements`, 
    movement
  );
  return response.data;
};