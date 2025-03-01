import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageRoutes } from "../utils/pageRoutes";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const isMobileMenuOpen = Boolean(mobileMenuAnchor);

  const [productsMenuAnchor, setProductsMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [movementsMenuAnchor, setMovementsMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleProductsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProductsMenuAnchor(event.currentTarget);
  };

  const handleProductsMenuClose = () => {
    setProductsMenuAnchor(null);
  };

  const handleMovementsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMovementsMenuAnchor(event.currentTarget);
  };

  const handleMovementsMenuClose = () => {
    setMovementsMenuAnchor(null);
  };

  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ mb: 4 }}>
      <Toolbar>
        <Typography
          component={Link}
          to={PageRoutes.Home}
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InventoryIcon sx={{ mr: 1 }} />
          Inventory Management
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={mobileMenuAnchor}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2)",
                  mt: 1.5,
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                component={Link}
                to={PageRoutes.Products}
                onClick={handleMobileMenuClose}
              >
                Products
              </MenuItem>
              <MenuItem
                component={Link}
                to={PageRoutes.AddProduct}
                onClick={handleMobileMenuClose}
              >
                Add Product
              </MenuItem>
              <MenuItem
                component={Link}
                to={PageRoutes.Search}
                onClick={handleMobileMenuClose}
              >
                Search Products
              </MenuItem>
              <MenuItem
                component={Link}
                to={PageRoutes.ExpiredBatches}
                onClick={handleMobileMenuClose}
              >
                Expired Batches
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem
                component={Link}
                to={PageRoutes.AllMovements}
                onClick={handleMobileMenuClose}
              >
                All Movements
              </MenuItem>
              <MenuItem
                component={Link}
                to={PageRoutes.AddMovement}
                onClick={handleMobileMenuClose}
              >
                Register Movement
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Box>
              <Button
                color="inherit"
                onClick={handleProductsMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ mx: 1 }}
              >
                Products
              </Button>
              <Menu
                anchorEl={productsMenuAnchor}
                open={Boolean(productsMenuAnchor)}
                onClose={handleProductsMenuClose}
                PaperProps={{
                  elevation: 1,
                  sx: {
                    overflow: "visible",
                    mt: 1,
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to={PageRoutes.Products}
                  onClick={handleProductsMenuClose}
                >
                  View Products
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={PageRoutes.AddProduct}
                  onClick={handleProductsMenuClose}
                >
                  Add Product
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={PageRoutes.Search}
                  onClick={handleProductsMenuClose}
                >
                  Search Products
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={PageRoutes.ExpiredBatches}
                  onClick={handleProductsMenuClose}
                >
                  Expired Batches
                </MenuItem>
              </Menu>
            </Box>

            <Box>
              <Button
                color="inherit"
                onClick={handleMovementsMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ mx: 1 }}
              >
                Inventory
              </Button>
              <Menu
                anchorEl={movementsMenuAnchor}
                open={Boolean(movementsMenuAnchor)}
                onClose={handleMovementsMenuClose}
                PaperProps={{
                  elevation: 1,
                  sx: {
                    overflow: "visible",
                    mt: 1,
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to={PageRoutes.AllMovements}
                  onClick={handleMovementsMenuClose}
                >
                  All Movements
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={PageRoutes.AddMovement}
                  onClick={handleMovementsMenuClose}
                >
                  Register Movement
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
