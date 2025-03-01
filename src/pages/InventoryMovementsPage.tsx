import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
  Chip,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import { InventoryMovement, Product } from "../utils/types";
import { useEffect, useState } from "react";
import { getMovements, getProducts } from "../utils/api";
import { Link as RouterLink } from "react-router-dom";

const InventoryMovementsPage = () => {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleFetchMovements = () => {
    getMovements(productId).then(setMovements);
  };

  useEffect(() => {
    if (productId.length > 0) handleFetchMovements();
  }, [productId]);

  const getMovementColor = (type: string) => {
    switch (type) {
      case "Outgoing":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container>
      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Inventory Movements</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Inventory Movements
      </Typography>

      <Box my={3}>
        <Typography variant="h6" gutterBottom>
          Select a product to view its movements
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                elevation={0}
                sx={{
                  cursor: "pointer",
                  border:
                    productId === product.id
                      ? "2px solid #1976d2"
                      : "1px solid #eee",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#1976d2",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  },
                }}
                onClick={() => setProductId(product.id ?? "")}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {movements.length > 0 && (
        <Box my={4}>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" gutterBottom>
            Movements History
          </Typography>

          <Grid container spacing={2}>
            {movements.map((movement) => (
              <Grid item xs={12} key={movement.id}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #eee",
                    mb: 1,
                  }}
                >
                  <CardContent>
                    <Grid container alignItems="center">
                      <Grid item xs={6} sm={3}>
                        <Chip
                          label={movement.movementType}
                          color={getMovementColor(movement.movementType) as any}
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2">
                          <strong>Quantity:</strong> {movement.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2">
                          <strong>Date:</strong>{" "}
                          {new Date(movement.movementDate).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2">
                          {movement.origin && (
                            <span>
                              <strong>From:</strong> {movement.origin}
                            </span>
                          )}
                          {movement.destination && (
                            <span>
                              <strong>To:</strong> {movement.destination}
                            </span>
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default InventoryMovementsPage;
