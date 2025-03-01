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
} from "@mui/material";
import { Batch, Product } from "../utils/types";
import { getBatchesByProduct, getProduct } from "../utils/api";
import BatchList from "../components/BatchList";
import AddIcon from "@mui/icons-material/Add";

const BatchesPage: React.FC = () => {
  const { productId = "" } = useParams<{ productId: string }>();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productId) {
      setLoading(true);

      getProduct(productId)
        .then((productData) => {
          setProduct(productData);

          return getBatchesByProduct(productId);
        })
        .then((batchesData) => {
          setBatches(batchesData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setError("Error loading data. Please try again.");
          setLoading(false);
        });
    } else {
      setError("Product ID is required");
      setLoading(false);
    }
  }, [productId]);

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
          {product && (
            <Typography color="text.primary">{product.name}</Typography>
          )}
        </Breadcrumbs>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" component="h1">
          {product ? `Batches for ${product.name}` : "Product Batches"}
        </Typography>

        <Button
          component={RouterLink}
          to={`/add-batch/${productId}`}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          disableElevation
        >
          Add Batch
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
          <BatchList batches={batches} productName={product?.name} />
        </Box>
      )}
    </Container>
  );
};

export default BatchesPage;
