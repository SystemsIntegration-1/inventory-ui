import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import { PageRoutes } from "./utils/pageRoutes";
import SearchProductsPage from "./pages/SearchProductsPage";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import InventoryMovementsPage from "./pages/InventoryMovementsPage";
import Header from "./components/Header";
import ProductDetailPage from "./pages/ProductDetailPage";
import BatchesPage from "./pages/BatchesPage";
import AddBatchPage from "./pages/AddBatchPage";
import ExpiredBatchesPage from "./pages/ExpiredBatchesPage";
import AllMovementsPage from "./pages/AllMovementsPage";
import AddMovementPage from "./pages/AddMovementPage";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container sx={{ pt: 2, pb: 4 }}>
          <Routes>
            <Route path={PageRoutes.Home} element={<Home />} />
            <Route path={PageRoutes.Products} element={<ProductsPage />} />
            <Route path={`${PageRoutes.Products}/:id`} element={<ProductDetailPage />} />
            <Route path={PageRoutes.Search} element={<SearchProductsPage />} />
            <Route path={PageRoutes.AddProduct} element={<AddProductPage />} />
            <Route path={`${PageRoutes.UpdateProduct}/:id`} element={<UpdateProductPage />} />
            
            <Route path={`${PageRoutes.Batches}/:productId`} element={<BatchesPage />} />
            <Route path={`${PageRoutes.AddBatch}/:productId`} element={<AddBatchPage />} />
            <Route path={PageRoutes.ExpiredBatches} element={<ExpiredBatchesPage />} />
            
            <Route path={PageRoutes.Movements} element={<InventoryMovementsPage />} />
            <Route path={PageRoutes.AllMovements} element={<AllMovementsPage />} />
            <Route path={PageRoutes.AddMovement} element={<AddMovementPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;