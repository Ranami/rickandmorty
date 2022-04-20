import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Auth } from "../context/Auth";
import { Avatar, IconButton, Tooltip } from "@mui/material";

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { token } = useContext(Auth);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#202329" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            Rick and Morty
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Button
              onClick={() => navigate("/heroes")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Characters
            </Button>
            <Button
              onClick={() => navigate("/counter")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Counter
            </Button>
            <Button
              onClick={() => navigate("/fcounter")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              FuncCounter
            </Button>
            <Button
              onClick={() => navigate("/todo")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              ToDo
            </Button>
            <Button
              onClick={() => navigate("/movies")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Movies
            </Button>
            <Button
              onClick={() => navigate("/shop")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Shop
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                onClick={() => navigate("/signin")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
