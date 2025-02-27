import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useState } from "react";
import { Product } from "../utils/types";
import { addProduct } from "../utils/api";
import { Typography } from "@mui/material";

const AddProductPage = () => {
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

  const handleSubmit = () => {
    addProduct(product).then(() => navigate("/products"));
  };

  return (
    <div>
      <Typography variant="h4">Add Medicine</Typography>
      <br /><br />
      <ProductForm
        product={product}
        setProduct={setProduct}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProductPage;
