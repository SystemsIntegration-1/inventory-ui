import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { getProducts } from "../utils/api";
import { Product } from "../utils/types";

// Products Page
const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  return (
    <div>
      <Typography variant="h4">Products</Typography>
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography>{product.category}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsPage;
