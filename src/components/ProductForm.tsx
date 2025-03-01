import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Box,
  FormHelperText,
} from "@mui/material";
import { CreateProduct } from "../utils/types";
import Grid from "@mui/material/Grid";

interface ProductFormProps {
  product: CreateProduct;
  setProduct: (product: CreateProduct) => void;
  onSubmit: () => void;
  isUpdate?: boolean;
}

const categories = [
  "Analgesics",
  "Antibiotics",
  "Antivirals",
  "Vaccines",
  "Supplements",
];

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  setProduct,
  onSubmit,
  isUpdate = false,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!product.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!product.category) {
      newErrors.category = "Category is required";
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!product.warehouseLocation.trim()) {
      newErrors.warehouseLocation = "Warehouse location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 2, border: "1px solid #eee" }}
    >
      <Grid container spacing={3}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            select
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={!!errors.category}
            helperText={errors.category}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            size="small"
            error={!!errors.description}
            helperText={errors.description}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Warehouse Location"
            name="warehouseLocation"
            value={product.warehouseLocation}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={!!errors.warehouseLocation}
            helperText={errors.warehouseLocation}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <FormHelperText>
            {isUpdate
              ? "Note: Product batches are managed separately"
              : "After creating the product, you can add batches with quantities and expiration dates"}
          </FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              disableElevation
            >
              {isUpdate ? "Update Product" : "Create Product"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductForm;
