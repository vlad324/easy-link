import { Box, Button, Container, Grid } from "@mui/material";

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
            <Button size="large" fullWidth variant="contained">
              Create link
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button size="large" fullWidth variant="contained">
              Redeem tokens
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Menu;