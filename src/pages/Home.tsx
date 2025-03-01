import { Link } from "react-router-dom";
import { Container, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { PageRoutes } from "../utils/pageRoutes";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InventoryIcon from "@mui/icons-material/Inventory";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="500">
          Inventory Management System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your medical products inventory efficiently
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 3 }}>
            Product Management
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              border: "1px solid #eee",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
              },
            }}
          >
            <ViewListIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom align="center">
              View Products
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, flexGrow: 1 }}
            >
              Browse and manage your product inventory
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to={PageRoutes.Products}
              fullWidth
            >
              View Products
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              border: "1px solid #eee",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
              },
            }}
          >
            <AddCircleOutlineIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom align="center">
              Add Product
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, flexGrow: 1 }}
            >
              Add new products to your inventory
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to={PageRoutes.AddProduct}
              fullWidth
            >
              Add New Product
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              border: "1px solid #eee",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
              },
            }}
          >
            <SearchIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom align="center">
              Search Products
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, flexGrow: 1 }}
            >
              Find products quickly in the inventory
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to={PageRoutes.Search}
              fullWidth
            >
              Search
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              border: "1px solid #eee",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
              },
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 48, color: "error.main", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom align="center">
              Expired Batches
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, flexGrow: 1 }}
            >
              Manage and clear expired product batches
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to={PageRoutes.ExpiredBatches}
              fullWidth
              color="error"
            >
              View Expired Batches
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 3 }}>
            Inventory Movements
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              border: "1px solid #eee",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
              },
            }}
          >
            <SwapHorizIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom align="center">
              All Movements
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, flexGrow: 1 }}
            >
              Track and monitor all inventory movements
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to={PageRoutes.AllMovements}
              fullWidth
            >
              View All Movements
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              border: "1px solid #eee",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(0,0,0,0.07)",
              },
            }}
          >
            <InventoryIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom align="center">
              Register Movement
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, flexGrow: 1 }}
            >
              Record incoming, outgoing, or transfer movements
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to={PageRoutes.AddMovement}
              fullWidth
            >
              New Movement
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
