import { Card, CardContent, Typography } from "@mui/material";
import { InventoryMovement, Product } from "../utils/types";
import { useEffect, useState } from "react";
import { getMovements, getProducts } from "../utils/api";

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

  return (
    <div>
      <Typography variant="h4">Inventory Movements</Typography>
      <br />
      <br />
      <Typography variant="h5">Products</Typography>
      <Typography>Select a product to get its movements</Typography>

      <br />
      {products.map((product) => (
        <div key={product.id} onClick={() => setProductId(product.id ?? "")}>
          <Card>
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography>{product.category}</Typography>
            </CardContent>
          </Card>
        </div>
      ))}

      <br />
      <br />
      {movements.length > 0 && <Typography variant="h5">Movements</Typography>}
      {movements.map((movement) => (
        <Card key={movement.id}>
          <CardContent>
            <Typography>{movement.movementType}</Typography>
            <Typography>{movement.quantity}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InventoryMovementsPage;
