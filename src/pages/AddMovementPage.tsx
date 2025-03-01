import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { InventoryMovement, InventoryMovementResponse } from "../utils/types";
import { registerMovement } from "../utils/api";
import InventoryMovementForm from "../components/InventoryMovementForm";

const AddMovementPage: React.FC = () => {
  const [movement, setMovement] = useState<InventoryMovement>({
    productId: "",
    movementType: "",
    quantity: 0,
    movementDate: new Date().getTime(),
    origin: "",
    destination: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    setError("");
    setSuccess("");

    registerMovement(movement)
      .then((response: InventoryMovementResponse) => {
        setLoading(false);

        if (response.success) {
          setSuccess(response.message);
          setMovement({
            productId: "",
            movementType: "",
            quantity: 0,
            movementDate: new Date().getTime(),
            origin: "",
            destination: "",
          });

          setTimeout(() => {
            navigate("/all-movements");
          }, 1500);
        } else {
          setError(response.message);
        }
      })
      .catch((err) => {
        console.error("Error registering movement:", err);
        setError("Error registering inventory movement. Please try again.");
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
          <Link component={RouterLink} to="/all-movements" color="inherit">
            Movements
          </Link>
          <Typography color="text.primary">New Movement</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Register Inventory Movement
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={3}>
          <InventoryMovementForm
            movement={movement}
            setMovement={setMovement}
            onSubmit={handleSubmit}
            error={error}
            success={success}
          />
        </Box>
      )}
    </Container>
  );
};

export default AddMovementPage;
