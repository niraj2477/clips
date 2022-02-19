import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "./Drawer";
import Search from "./Search";
import HeaderButtons from "./HeaderButtons";
import { ReactComponent as Light } from "../../logo/light.svg";
import { ReactComponent as Dark } from "../../logo/dark.svg";
import { Link } from "react-router-dom";
import { HOME } from "../../helpers/constants";
import { isHome } from "../../actions/navigationAction";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    position: "fixed",
    top: 0,
    zIndex: 100,
    [theme.breakpoints.down("sm")]: {
      position: "static",
    },
  },
  logo: {
    flexGrow: 1,

    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(6),
      maxWidth: 100,
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: 100,
      marginRight: theme.spacing(16),
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 100,
      marginRight: theme.spacing(15),
    },
    paddingTop: theme.spacing(0.5),
  },
  removeBlock: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="inherit"
        style={
          theme.isDark ? { background: "#181818" } : { background: "#f9f9f9" }
        }
      >
        <Toolbar>
          <div className={classes.removeBlock}>
            <Drawer />
          </div>
          <Link to={HOME} onClick={dispatch(isHome())}>
            {theme.isDark ? (
              <Dark className={classes.logo} height="60px" width="100px" />
            ) : (
              <Light className={classes.logo} height="60px" width="100px" />
            )}
          </Link>
          <Search />
          <HeaderButtons />
        </Toolbar>
      </AppBar>
    </div>
  );
}
