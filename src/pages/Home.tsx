import { Link } from "react-router-dom";
import { Container, Button, Stack, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" component={Link} to="/products">
          View Products
        </Button>
        <Button variant="contained" component={Link} to="/search">
          Search Products
        </Button>
        <Button variant="contained" component={Link} to="/movements">
          Inventory Movements
        </Button>
        <Button variant="contained" component={Link} to="/add-product">
          Add Product
        </Button>
        <Button variant="contained" component={Link} to="/update-product">
          Update Product
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
