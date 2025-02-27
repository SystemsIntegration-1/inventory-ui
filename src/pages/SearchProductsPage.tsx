import { useState } from "react";
import { Product } from "../utils/types";
import { searchProducts } from "../utils/api";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const SearchProductsPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = () => {
    searchProducts(query).then(setResults);
  };

  return (
    <div>
      <Typography variant="h4">Search Products</Typography>
      <br />

      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search"
      />
      <Button onClick={handleSearch}>Search</Button>

      <br />
      <br />
      {results.map((product) => (
        <Card key={product.id}>
          <CardContent>
            <Typography>{product.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchProductsPage;
