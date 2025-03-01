import React from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { CreateBatch } from "../utils/types";
import Grid from "@mui/material/Grid";

interface BatchFormProps {
  batch: CreateBatch;
  setBatch: (batch: CreateBatch) => void;
  onSubmit: () => void;
  productName?: string;
}

const BatchForm: React.FC<BatchFormProps> = ({
  batch,
  setBatch,
  onSubmit,
  productName,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBatch({ ...batch, [name]: value });
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 2, border: "1px solid #eee" }}
    >
      {productName && (
        <Box mb={3}>
          <TextField
            label="Product"
            value={productName}
            fullWidth
            variant="outlined"
            size="small"
            disabled
          />
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Stock Quantity"
            name="stock"
            type="number"
            value={batch.stock}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Entry Date"
            name="entryDate"
            type="date"
            value={new Date(batch.entryDate).toISOString().split("T")[0]}
            onChange={(e) =>
              setBatch({
                ...batch,
                entryDate: new Date(e.target.value).getTime(),
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
            label="Expiration Date"
            name="expirationDate"
            type="date"
            value={new Date(batch.expirationDate).toISOString().split("T")[0]}
            onChange={(e) =>
              setBatch({
                ...batch,
                expirationDate: new Date(e.target.value).getTime(),
              })
            }
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              fullWidth
              disableElevation
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BatchForm;
