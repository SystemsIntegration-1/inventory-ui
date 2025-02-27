import React from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { InventoryMovement } from "../utils/types";
import Grid from "@mui/material/Grid2";

interface InventoryMovementFormProps {
  movement: InventoryMovement;
  setMovement: (movement: InventoryMovement) => void;
  onSubmit: () => void;
}

const movementTypes = ["Incoming", "Outgoing", "Transfer"];

const InventoryMovementForm: React.FC<InventoryMovementFormProps> = ({
  movement,
  setMovement,
  onSubmit,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovement({ ...movement, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 6, sm: 12 }}>
        <TextField
          label="Product ID"
          name="productId"
          value={movement.productId}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ md: 6, sm: 12 }}>
        <TextField
          select
          label="Movement Type"
          name="movementType"
          value={movement.movementType}
          onChange={handleChange}
          fullWidth
        >
          {movementTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={movement.quantity}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
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
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label="Origin"
          name="origin"
          value={movement.origin}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label="Destination"
          name="destination"
          value={movement.destination}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
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

export default InventoryMovementForm;
