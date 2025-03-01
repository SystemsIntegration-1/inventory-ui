import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { InventoryMovement } from "../utils/types";
import { getAllMovements } from "../utils/api";
import MovementList from "../components/MovementList";
import AddIcon from "@mui/icons-material/Add";

const AllMovementsPage: React.FC = () => {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllMovements()
      .then((data) => {
        setMovements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movements:", err);
        setError("Error loading movements. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">All Movements</Typography>
        </Breadcrumbs>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" component="h1">
          Inventory Movements
        </Typography>

        <Button
          component={RouterLink}
          to="/add-movement"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          disableElevation
        >
          New Movement
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={3}>
          <MovementList movements={movements} title="All Inventory Movements" />
        </Box>
      )}
    </Container>
  );
};

export default AllMovementsPage;
