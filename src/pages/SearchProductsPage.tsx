import { useState } from "react";
import { Product } from "../utils/types";
import { searchProducts } from "../utils/api";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  InputAdornment,
  Breadcrumbs,
  Link,
  Chip,
  Divider,
  CardActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link as RouterLink } from "react-router-dom";

const SearchProductsPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      setLoading(true);
      setError("");

      searchProducts(query)
        .then((data) => {
          setResults(data);
          setHasSearched(true);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error searching products:", err);
          setError("Error searching products. Please try again.");
          setLoading(false);
        });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container>
      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Search Products</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h5" component="h1" gutterBottom>
        Search Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          label="Search for products"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          disableElevation
          sx={{ ml: 2 }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
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
        hasSearched && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              {results.length > 0
                ? `Search Results (${results.length})`
                : "No products found"}
            </Typography>

            <Grid container spacing={3}>
              {results.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <Card
                    elevation={0}
                    sx={{
                      border: "1px solid #eee",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {product.name}
                      </Typography>

                      <Chip
                        label={product.category}
                        size="small"
                        sx={{ my: 1 }}
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
                            <strong>Location:</strong>{" "}
                            {product.warehouseLocation}
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
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      )}
    </Container>
  );
};

export default SearchProductsPage;
