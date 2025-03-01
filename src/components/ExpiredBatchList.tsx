import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import { ExpiredBatch } from "../utils/types";

interface ExpiredBatchListProps {
  batches: ExpiredBatch[];
  onClearAll?: () => void;
}

const ExpiredBatchList: React.FC<ExpiredBatchListProps> = ({
  batches,
  onClearAll,
}) => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6">Expired Batches ({batches.length})</Typography>

        {onClearAll && batches.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={onClearAll}
            size="small"
          >
            Clear All Expired Batches
          </Button>
        )}
      </Box>

      {batches.length === 0 ? (
        <Typography color="text.secondary">No expired batches</Typography>
      ) : (
        <Grid container spacing={2}>
          {batches.map((batch) => (
            <Grid item xs={12} sm={6} md={4} key={batch.batchId}>
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
                    {batch.productName}
                  </Typography>

                  <Chip
                    label={batch.productCategory}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />

                  <Chip
                    label="Expired"
                    color="error"
                    size="small"
                    sx={{ ml: 1, mb: 1 }}
                  />

                  <Divider sx={{ my: 1 }} />

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Batch ID:</strong>{" "}
                        {batch.batchId.substring(0, 8)}
                      </Typography>
                    </Grid>
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
                        <strong>Expired:</strong>{" "}
                        {new Date(batch.expirationDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ExpiredBatchList;
