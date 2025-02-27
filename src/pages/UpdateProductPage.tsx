import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../utils/api";
import { Product } from "../utils/types";
import { Typography } from "@mui/material";
import ProductForm from "../components/ProductForm";

const UpdateProductPage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    name: "",
    category: "",
    description: "",
    availableQuantity: 0,
    warehouseLocation: "",
    entryDate: new Date().getTime(),
    expirationDate: new Date().getTime(),
  });
  const navigate = useNavigate();

  const handleUpdate = () => {
    updateProduct(id, product).then(() => navigate("/products"));
  };

  return (
    <div>
      <Typography variant="h4">Update Medicine</Typography>

      <ProductForm
        product={product}
        setProduct={setProduct}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UpdateProductPage;
