import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import Drawer from "./Drawer";
import Search from "./Search";
import HeaderButtons from "./HeaderButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    position: "fixed",
    top: 0,
    [theme.breakpoints.down("sm")]: {
      position: "static",
    },
  },
  title: {
    flexGrow: 1,
  },
  removeBlock: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useSelector((state) => state.theme);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="text"
        style={
          theme.isDark ? { background: "#181818" } : { background: "#f9f9f9" }
        }
      >
        <Toolbar>
          <div className={classes.removeBlock}>
            <Drawer />
          </div>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Search />
          <HeaderButtons />
        </Toolbar>
      </AppBar>
    </div>
  );
}
