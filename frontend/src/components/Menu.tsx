import { Box, Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Link to="/create" style={{ textDecoration: "none" }}>
              <Button size="large" fullWidth variant="contained">
                Create link
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/redeem" style={{ textDecoration: "none" }}>
              <Button size="large" fullWidth variant="contained">
                Redeem tokens
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Menu;