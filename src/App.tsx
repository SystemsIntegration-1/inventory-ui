import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import { PageRoutes } from "./utils/pageRoutes";
import SearchProductsPage from "./pages/SearchProductsPage";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import InventoryMovementsPage from "./pages/InventoryMovementsPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path={PageRoutes.Home} element={<Home />} />
          <Route path={PageRoutes.Products} element={<ProductsPage />} />
          <Route path={PageRoutes.Search} element={<SearchProductsPage />} />
          <Route
            path={PageRoutes.Movements}
            element={<InventoryMovementsPage />}
          />
          <Route path={PageRoutes.AddProduct} element={<AddProductPage />} />
          <Route
            path={`${PageRoutes.UpdateProduct}/:id`}
            element={<UpdateProductPage />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
