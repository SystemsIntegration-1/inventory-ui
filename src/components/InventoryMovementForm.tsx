import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Box,
  Typography,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { InventoryMovement } from "../utils/types";
import Grid from "@mui/material/Grid";
import ProductSelector from "./ProductSelector";

interface InventoryMovementFormProps {
  movement: InventoryMovement;
  setMovement: (movement: InventoryMovement) => void;
  onSubmit: () => void;
  error?: string;
  success?: string;
}

const movementTypes = ["Incoming", "Outgoing", "Transfer"];

const InventoryMovementForm: React.FC<InventoryMovementFormProps> = ({
  movement,
  setMovement,
  onSubmit,
  error,
  success,
}) => {
  const [selectedProductName, setSelectedProductName] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovement({ ...movement, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setMovement({ ...movement, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleProductChange = (productId: string, productName?: string) => {
    setMovement({ ...movement, productId });
    if (productName) {
      setSelectedProductName(productName);
    }

    if (formErrors.productId) {
      setFormErrors({ ...formErrors, productId: "" });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!movement.productId) {
      errors.productId = "Product is required";
    }

    if (!movement.movementType) {
      errors.movementType = "Movement type is required";
    }

    if (!movement.quantity || movement.quantity <= 0) {
      errors.quantity = "Quantity must be greater than 0";
    }

    if (!movement.origin) {
      errors.origin = "Origin is required";
    }

    if (!movement.destination) {
      errors.destination = "Destination is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      {error && (
        <Box sx={{ mb: 3, p: 2, bgcolor: "#ffebee", borderRadius: 1 }}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </Box>
      )}

      {success && (
        <Box sx={{ mb: 3, p: 2, bgcolor: "#e8f5e9", borderRadius: 1 }}>
          <Typography color="success.main" variant="body2">
            {success}
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProductSelector
            value={movement.productId}
            onChange={handleProductChange}
            label="Select Product"
            error={formErrors.productId}
          />
        </Grid>

        <Grid item md={6} sm={12} xs={12}>
          <FormControl
            fullWidth
            error={!!formErrors.movementType}
            variant="outlined"
            size="small"
          >
            <InputLabel>Movement Type</InputLabel>
            <Select
              name="movementType"
              value={movement.movementType}
              onChange={handleSelectChange as any}
              label="Movement Type"
            >
              {movementTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {formErrors.movementType && (
              <FormHelperText>{formErrors.movementType}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item md={6} sm={12} xs={12}>
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={movement.quantity}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={!!formErrors.quantity}
            helperText={formErrors.quantity}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Movement Date"
            name="movementDate"
            type="date"
            value={new Date(movement.movementDate).toISOString().split("T")[0]}
            onChange={(e) =>
              setMovement({
                ...movement,
                movementDate: new Date(e.target.value).getTime(),
              })
            }
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Origin"
            name="origin"
            value={movement.origin}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={!!formErrors.origin}
            helperText={formErrors.origin}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Destination"
            name="destination"
            value={movement.destination}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={!!formErrors.destination}
            helperText={formErrors.destination}
          />
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
              Register Movement
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InventoryMovementForm;
