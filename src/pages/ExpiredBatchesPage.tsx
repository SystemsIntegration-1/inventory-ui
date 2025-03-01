import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ExpiredBatch } from "../utils/types";
import { getExpiredBatches, clearExpiredBatches } from "../utils/api";
import ExpiredBatchList from "../components/ExpiredBatchList";

const ExpiredBatchesPage: React.FC = () => {
  const [batches, setBatches] = useState<ExpiredBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchExpiredBatches = () => {
    setLoading(true);
    getExpiredBatches()
      .then((data) => {
        setBatches(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching expired batches:", err);
        setError("Error loading expired batches. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExpiredBatches();
  }, []);

  const handleClearExpired = () => {
    setConfirmOpen(false);
    setLoading(true);

    clearExpiredBatches()
      .then(() => {
        setSuccess("Expired batches cleared successfully");
        setBatches([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error clearing expired batches:", err);
        setError("Error clearing expired batches. Please try again.");
        setLoading(false);
      });
  };

  return (
    <Container>
      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Expired Batches</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Expired Batches
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
          {success}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={3}>
          <ExpiredBatchList
            batches={batches}
            onClearAll={() => setConfirmOpen(true)}
          />
        </Box>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to clear all expired batches? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleClearExpired}
            color="error"
            variant="contained"
            disableElevation
          >
            Clear All Expired
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpiredBatchesPage;
