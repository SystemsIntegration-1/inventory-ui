import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { Product, Batch, InventoryMovement } from "../utils/types";
import { getProduct, getBatchesByProduct, getMovements } from "../utils/api";
import BatchList from "../components/BatchList";
import MovementList from "../components/MovementList";
import AddIcon from "@mui/icons-material/Add";

const ProductDetailPage: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (id) {
      setLoading(true);

      getProduct(id)
        .then((productData) => {
          setProduct(productData);

          return getBatchesByProduct(id);
        })
        .then((batchesData) => {
          setBatches(batchesData);

          return getMovements(id);
        })
        .then((movementsData) => {
          setMovements(movementsData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setError("Error loading data. Please try again.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/products" color="inherit">
            Products
          </Link>
          <Typography color="text.primary">
            {product ? product.name : "Product Details"}
          </Typography>
        </Breadcrumbs>
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
        product && (
          <>
            <Card
              elevation={0}
              sx={{
                mb: 4,
                border: "1px solid #eee",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" component="h1" gutterBottom>
                      {product.name}
                    </Typography>

                    <Chip
                      label={product.category}
                      size="small"
                      sx={{ mb: 2 }}
                      variant="outlined"
                    />

                    <Typography variant="body1" paragraph>
                      {product.description}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        border: "1px solid #eee",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Inventory Summary
                      </Typography>

                      <Divider sx={{ my: 1 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Stock:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="bold">
                            {product.totalStock || 0} units
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Location:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {product.warehouseLocation}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Batches:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {batches.length}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Button
                        component={RouterLink}
                        to={`/add-batch/${id}`}
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        fullWidth
                        disableElevation
                        size="small"
                      >
                        Add Batch
                      </Button>

                      <Button
                        component={RouterLink}
                        to={`/update-product/${id}`}
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        Edit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{ mb: 4 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Batches" />
                <Tab label="Movement History" />
              </Tabs>
            </Box>

            <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
              <BatchList batches={batches} />
            </Box>

            <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
              <MovementList movements={movements} />
            </Box>
          </>
        )
      )}
    </Container>
  );
};

export default ProductDetailPage;
