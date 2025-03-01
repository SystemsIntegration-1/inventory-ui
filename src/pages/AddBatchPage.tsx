import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BatchForm from "../components/BatchForm";
import { CreateBatch, Product } from "../utils/types";
import { addBatch, getProduct } from "../utils/api";

const AddBatchPage: React.FC = () => {
  const { productId = "" } = useParams<{ productId: string }>();
  const [batch, setBatch] = useState<CreateBatch>({
    productId: productId,
    stock: 0,
    entryDate: new Date().getTime(),
    expirationDate: new Date().setMonth(new Date().getMonth() + 6),
  });
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProduct(productId)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("Error loading product. Please try again.");
          setLoading(false);
        });
    } else {
      setError("Product ID is required");
      setLoading(false);
    }
  }, [productId]);

  const handleSubmit = () => {
    if (batch.stock <= 0) {
      setError("Stock must be greater than 0");
      return;
    }

    setLoading(true);
    addBatch(batch)
      .then(() => {
        navigate(`/products/${productId}`);
      })
      .catch((err) => {
        console.error("Error adding batch:", err);
        setError("Error adding batch. Please try again.");
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
          <Link component={RouterLink} to="/products" color="inherit">
            Products
          </Link>
          {product && (
            <Link
              component={RouterLink}
              to={`/products/${productId}`}
              color="inherit"
            >
              {product.name}
            </Link>
          )}
          <Typography color="text.primary">Add Batch</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Add New Batch
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && !error ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={3}>
          <BatchForm
            batch={batch}
            setBatch={setBatch}
            onSubmit={handleSubmit}
            productName={product?.name}
          />
        </Box>
      )}
    </Container>
  );
};

export default AddBatchPage;
