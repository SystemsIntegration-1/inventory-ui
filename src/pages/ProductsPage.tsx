import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
  Breadcrumbs,
  Link,
  Chip,
  Divider,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getProducts } from "../utils/api";
import { Product } from "../utils/types";
import { Link as RouterLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Error loading products. Please try again.");
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
          <Typography color="text.primary">Products</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Product Inventory
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
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {products.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="text.secondary">No products found</Typography>
            </Grid>
          ) : (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #eee",
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {product.name}
                    </Typography>

                    <Chip
                      label={product.category}
                      size="small"
                      sx={{ mb: 2 }}
                      variant="outlined"
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {product.description}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          <strong>Stock:</strong> {product.totalStock || 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          <strong>Location:</strong> {product.warehouseLocation}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>Batches:</strong>{" "}
                          {product.batches?.length || 0}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/products/${product.id}`}
                      size="small"
                      startIcon={<VisibilityIcon />}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    <Button
                      component={RouterLink}
                      to={`/update-product/${product.id}`}
                      size="small"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ProductsPage;
