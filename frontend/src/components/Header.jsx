import React from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store";

function Header() {
  const Navigate = useNavigate();
  const isLoggedin = useSelector(state => state.isLoggedin);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.status === 200) {
        dispatch(authActions.logout()); // Correctly dispatch logout action
        console.log('logout successfully');
        Navigate('/login');
      } else {
        throw new Error("Unable to logout! Try again");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5">MERN Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              textColor="inherit"
              indicatorColor="secondary"
            >
              {!isLoggedin &&
                <>
                  <Tab to="/login" component={Link} label="Login" />
                  <Tab to="/signup" component={Link} label="Signup" />
                </>
              }
              {isLoggedin && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  component={Link}
                  label="Logout"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
