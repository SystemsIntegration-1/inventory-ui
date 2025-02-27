import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { PageRoutes } from "../utils/pageRoutes";

const Header = () => {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography
          component={Link}
          to={PageRoutes.Home}
          variant="h5"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}
        >
          Inventory Management
        </Typography>
        <List sx={{ display: "flex" }}>
          <ListItem
            component={Link}
            to={PageRoutes.Products}
            sx={{ color: "#fff", mx: 1 }}
          >
            <ListItemText primary="View Products" />
          </ListItem>
          <ListItem
            component={Link}
            to={PageRoutes.Search}
            sx={{ color: "#fff", mx: 1 }}
          >
            <ListItemText primary="Search Products" />
          </ListItem>
          <ListItem
            component={Link}
            to={PageRoutes.Movements}
            sx={{ color: "#fff", mx: 1 }}
          >
            <ListItemText primary="Inventory Movements" />
          </ListItem>
          <ListItem
            component={Link}
            to={PageRoutes.AddProduct}
            sx={{ color: "#fff", mx: 1 }}
          >
            <ListItemText primary="Add Product" />
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
