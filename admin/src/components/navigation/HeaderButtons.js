/* eslint-disable no-unused-vars */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { isDark } from "../../actions/themeAction";
const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginRight: theme.spacing(0.5),
  },
  textLink: {
    color: "inherit",
    textDecoration: " inherit",
  },
  removeBlock: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.only("md")]: {
      display: "inline-block",
    },
  },
  removeIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  buttonDiv: {
    display: "inline-block",
  },
  avatarDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(13),
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(20),
    },

    marginTop: theme.spacing(-6),
  },
}));
export default function HeaderButtons() {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const handleThemeChange = () => {
    dispatch(isDark());
  };

 
  return (

    
    <div>
     
    
 
     

      {theme.isDark ? (
        <IconButton
          edge="end"
          className={classes.iconButton}
          color="inherit"
          onClick={handleThemeChange}
        >
          <Brightness7Icon />
        </IconButton>
      ) : (
        <IconButton
          edge="end"
          className={classes.iconButton}
          color="inherit"
          onClick={handleThemeChange}
        >
          <Brightness4Icon />
        </IconButton>
      )}
   
    </div>
  );
}
