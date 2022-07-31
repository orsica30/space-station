import React from "react";
import { AppBar, Grid, Toolbar, Typography, InputBase, Button } from "@mui/material";
import RocketLaunchSharpIcon from "@mui/icons-material/RocketLaunchSharp";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = ({ filter, handleFilter }) => {
  return (
    <>
      {/* Header */}
      <Grid item xs={12}>
        {/* Etiqueta de header-bar */}
        <AppBar position="static" sx={{ background: "#232223" }}>
          <Toolbar>
            {/* Icono de cohete. */}
            <RocketLaunchSharpIcon />

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                marginLeft: 2,
              }}
            >
              Space Station
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={filter} // Este value es un hook que esta en App.js y se trajo a través de props
                onChange={handleFilter} // Funcion que maneja el input la cual esta en App.js
              />
            </Search>
            
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
};

export default Header;
