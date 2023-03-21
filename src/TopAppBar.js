import React, { useState } from "react";
import { Grid, AppBar, Toolbar, Button } from "@material-ui/core";
import "./TopAppBar.scss";
import { navLinks } from "./SystemConstants";
import { Stack } from "@mui/system";

const TopAppBar = () => {
  const [navButtons, setNavButtons] = useState(navLinks);

  const handleChangeColor = (index) => {
    const temp = [...navButtons];
    temp.forEach((item, ind) => {
      if (index === ind || item.in) item.in = !item.in;
    });
    setNavButtons(temp);
  };

  return (
    <AppBar
      elevation={false}
      position="sticky"
      color="default"
      className="app-bar-wrappers"
    >
      <Toolbar>
        <Grid container>
          <img
            src="https://axecode.com/assets/images/logo/axecode-crop2.png"
            alt="logo"
            width="200"
            height="80"
          />
        </Grid>
        <Grid container justifyContent="flex-end">
          <Stack direction="row" spacing={2}>
            {navButtons.map((item, index) => {
              return (
                <Button
                  key={index}
                  className={`${item.in ? "btn-styles" : ""}`}
                  onClick={() => handleChangeColor(index)}
                >
                  {item.name}
                </Button>
              );
            })}
          </Stack>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
