import React from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { Product } from "../utils/types";
import Grid from "@mui/material/Grid2";

interface ProductFormProps {
  product: Product;
  setProduct: (product: Product) => void;
  onSubmit: () => void;
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
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 6, sm: 12 }}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ md: 6, sm: 12 }}>
        <TextField
          select
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          multiline
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label="Available Quantity"
          name="availableQuantity"
          type="number"
          value={product.availableQuantity}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label="Warehouse Location"
          name="warehouseLocation"
          value={product.warehouseLocation}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label="Entry Date"
          name="entryDate"
          type="date"
          value={new Date(product.entryDate).toISOString().split("T")[0]}
          onChange={(e) =>
            setProduct({
              ...product,
              entryDate: new Date(e.target.value).getTime(),
            })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label="Expiration Date"
          name="expirationDate"
          type="date"
          value={new Date(product.expirationDate).toISOString().split("T")[0]}
          onChange={(e) =>
            setProduct({
              ...product,
              expirationDate: new Date(e.target.value).getTime(),
            })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <br />
      <Grid size={{ xs: 12 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
