import axios from "axios";
import { InventoryMovement, Product } from "./types";
import { API_URL } from "./constants";

export const getProducts = async () => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get<Product>(`${API_URL}/products/${id}`);
  return response.data;
};

export const searchProducts = async (name: string) => {
  const response = await axios.get<Product[]>(
    `${API_URL}/products/search?name=${name}`
  );
  return response.data;
};

export const getMovements = async (productId: string) => {
  const response = await axios.get<InventoryMovement[]>(
    `${API_URL}/inventory/movements/${productId}`
  );
  return response.data;
};

export const addProduct = async (product: Product) => {
  const response = await axios.post<Product>(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: string, product: Product) => {
  await axios.put(`${API_URL}/products/${id}`, product);
};
