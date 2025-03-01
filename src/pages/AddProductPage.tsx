import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useState } from "react";
import { CreateProduct } from "../utils/types";
import { addProduct } from "../utils/api";
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

const AddProductPage = () => {
  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    category: "",
    description: "",
    warehouseLocation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    setError("");

    addProduct(product)
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        setError("Error adding product. Please try again.");
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
          <Typography color="text.primary">Add Product</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Add New Medicine
      </Typography>

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
          <ProductForm
            product={product}
            setProduct={setProduct}
            onSubmit={handleSubmit}
          />
        </Box>
      )}
    </Container>
  );
};

export default AddProductPage;
