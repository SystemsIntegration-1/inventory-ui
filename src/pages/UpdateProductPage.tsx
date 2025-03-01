import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../utils/api";
import { CreateProduct } from "../utils/types";
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
import ProductForm from "../components/ProductForm";

const UpdateProductPage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    category: "",
    description: "",
    warehouseLocation: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProduct(id)
        .then((data) => {
          setProduct({
            name: data.name,
            category: data.category,
            description: data.description,
            warehouseLocation: data.warehouseLocation,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("Error loading product. Please try again.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = () => {
    setLoading(true);
    updateProduct(id, product)
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        setError("Error updating product. Please try again.");
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
          <Typography color="text.primary">Update Product</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Update Product
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
            onSubmit={handleUpdate}
            isUpdate={true}
          />
        </Box>
      )}
    </Container>
  );
};

export default UpdateProductPage;
