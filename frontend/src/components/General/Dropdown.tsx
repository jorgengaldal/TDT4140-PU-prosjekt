import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icons from "./Icons"; // Assuming you have appropriate icons here
import { ButtonBase } from "@mui/material";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonBase
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        {isOpen ? <Icons name="Cross" /> : <Icons name="Dropdown" />}
      </ButtonBase>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#2D3250", 
            color: "white"
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          component="a"
          href="/category?name=Action"
        >
          Action
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="/category?name=Thriller"
        >
          Thriller
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="/category?name=Adventure"
        >
          Adventure
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="/category?name=Comedy"
        >
          Comedy
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="/category?name=Horror"
        >
          Horror
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="/category?name=Drama"
        >
          Drama
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="/category?name=Sci-Fi"
        >
          Sci-Fi
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;
