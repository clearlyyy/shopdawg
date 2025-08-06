import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Favorite,
  Person,
  KeyboardArrowDown,
  Home,
  HandymanOutlined,
  Collections,
  School,
  ContactSupport,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#5D4037" : "#3E2723",
  boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavbarButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: theme.spacing(0, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  textDecoration: "none",
}));

const IconButtons = styled(Box)(({ theme }) => ({
  display: "flex",
}));

// Main Navbar Component
const Navbar = ({ itemsInCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Categories for dropdown
  const categories = [
    { name: "All", icon: <HandymanOutlined /> },
    { name: "Handcrafted Furniture", icon: <HandymanOutlined /> },
    { name: "Wood Finishes", icon: <Collections /> },
    { name: "Workshops & Classes", icon: <School /> },
  ];

  // Desktop navbar
  const desktopNav = (
    <>
      <LogoContainer>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: "Merriweather, serif",
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
              alt="Shop Dawg"
              width="100px"
              height="auto"
            />
          </Link>
        </Typography>
      </LogoContainer>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <NavbarButton component={Link} startIcon={<Home />} to="/">
          Home
        </NavbarButton>

        <NavbarButton endIcon={<KeyboardArrowDown />} onClick={handleMenuOpen}>
          Shop
        </NavbarButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "shop-button",
          }}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.name}
              onClick={handleMenuClose}
              component={Link}
              to={`/shop?category=${category.name}`}
            >
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText>{category.name}</ListItemText>
            </MenuItem>
          ))}
        </Menu>

        <NavbarButton component={Link} to="/gallery">
          Gallery
        </NavbarButton>

        <NavbarButton component={Link} to="/about">
          About
        </NavbarButton>

        <NavbarButton
          startIcon={<ContactSupport />}
          component={Link}
          to="/contact"
        >
          Contact
        </NavbarButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton color="inherit" component={Link} to="/checkout">
          <Badge badgeContent={itemsInCart.length} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Box>
    </>
  );

  // Mobile navbar
  const mobileNav = (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMobileMenuToggle}
      >
        <MenuIcon />
      </IconButton>

      <LogoContainer sx={{ flexGrow: 1, justifyContent: "center" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: "Merriweather, serif",
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
              alt="Shop Dawg"
              width="100px"
              height="auto"
            />
          </Link>
        </Typography>
      </LogoContainer>

      <Box>
        <IconButton color="inherit"></IconButton>
        <IconButton color="inherit" component={Link} to="/checkout">
          <Badge badgeContent={itemsInCart.length} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" component="div">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logoBlack.svg`}
                alt="Shop Dawg"
                width="100px"
                height="auto"
              />
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={handleMobileMenuToggle}
              sx={{ color: "inherit" }}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/shop"
              onClick={handleMobileMenuToggle}
              sx={{ color: "inherit" }}
            >
              <ListItemIcon>
                <HandymanOutlined />
              </ListItemIcon>
              <ListItemText primary="Shop" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/gallery"
              onClick={handleMobileMenuToggle}
              sx={{ color: "inherit" }}
            >
              <ListItemIcon>
                <Collections />
              </ListItemIcon>
              <ListItemText primary="Gallery" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/about"
              onClick={handleMobileMenuToggle}
              sx={{ color: "inherit" }}
            >
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/contact"
              onClick={handleMobileMenuToggle}
              sx={{ color: "inherit" }}
            >
              <ListItemIcon>
                <ContactSupport />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );

  return (
    <StyledAppBar
      position="fixed"
      sx={scrolled ? { height: "64px" } : { height: "80px" }}
      color="primary"
    >
      <Container maxWidth="xl">
        <StyledToolbar
          disableGutters
          sx={{
            height: scrolled ? "64px" : "80px",
            transition: "height 0.3s ease",
          }}
        >
          {isMobile ? mobileNav : desktopNav}
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
