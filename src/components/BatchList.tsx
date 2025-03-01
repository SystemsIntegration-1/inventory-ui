import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import { Batch } from "../utils/types";

interface BatchListProps {
  batches: Batch[];
  productName?: string;
}

const BatchList: React.FC<BatchListProps> = ({ batches, productName }) => {
  const currentDate = new Date().getTime();

  const sortedBatches = [...batches].sort(
    (a, b) => a.expirationDate - b.expirationDate
  );

  const getBatchStatus = (expirationDate: number) => {
    const daysToExpire = Math.ceil(
      (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (expirationDate < currentDate) {
      return { label: "Expired", color: "error" };
    } else if (daysToExpire <= 30) {
      return { label: `Expires in ${daysToExpire} days`, color: "warning" };
    } else {
      return { label: `Expires in ${daysToExpire} days`, color: "success" };
    }
  };

  return (
    <Box>
      {productName && (
        <Typography variant="h6" gutterBottom>
          Batches for {productName}
        </Typography>
      )}

      {batches.length === 0 ? (
        <Typography color="text.secondary">No batches available</Typography>
      ) : (
        <Grid container spacing={2}>
          {sortedBatches.map((batch) => {
            const status = getBatchStatus(batch.expirationDate);

            return (
              <Grid item xs={12} sm={6} md={4} key={batch.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid #eee",
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Batch {batch.id ? batch.id.substring(0, 8) : ""}
                    </Typography>

                    <Chip
                      label={status.label}
                      color={status.color as any}
                      size="small"
                      sx={{ mb: 2 }}
                    />

                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>Stock:</strong> {batch.stock} units
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          <strong>Entry:</strong>{" "}
                          {new Date(batch.entryDate).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          <strong>Expires:</strong>{" "}
                          {new Date(batch.expirationDate).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default BatchList;
