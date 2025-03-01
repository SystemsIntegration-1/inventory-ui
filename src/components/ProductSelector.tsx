import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Product } from "../utils/types";
import { getProducts } from "../utils/api";

interface ProductSelectorProps {
  value: string;
  onChange: (productId: string, productName?: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  value,
  onChange,
  label = "Select Product",
  error,
  disabled = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setFetchError("Error loading products");
        setLoading(false);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const productId = event.target.value as string;
    const product = products.find((p) => p.id === productId);
    onChange(productId, product?.name);
  };

  if (loading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress size={24} sx={{ mr: 2 }} />
        <Typography variant="body2">Loading products...</Typography>
      </Box>
    );
  }

  if (fetchError) {
    return (
      <FormControl error fullWidth variant="outlined" size="small">
        <InputLabel>{label}</InputLabel>
        <Select value="" label={label} disabled>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        </Select>
        <FormHelperText>{fetchError}</FormHelperText>
      </FormControl>
    );
  }

  return (
    <FormControl
      fullWidth
      error={!!error}
      variant="outlined"
      size="small"
      disabled={disabled}
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange as any} label={label}>
        <MenuItem value="">
          <em>Select a product</em>
        </MenuItem>
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.name}{" "}
            {product.totalStock !== undefined
              ? `(Stock: ${product.totalStock})`
              : ""}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default ProductSelector;
