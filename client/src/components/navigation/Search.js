import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    width: "auto",
    [theme.breakpoints.only("md")]: {
      marginRight: theme.spacing(12),
    
     
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(20),
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  searchThemeDark: {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
  },
  searchThemeLight: {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    [theme.breakpoints.only("md")]: {
      width: "30ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60ch",
    },
  },
}));
function Search() {
  const classes = useStyles();
  const theme = useSelector((state) => state.theme);
  return (
    <div>
      <div
        className={`${classes.search} ${
          theme.isDark ? classes.searchThemeLight : classes.searchThemeDark
        }`}
      >
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: `${classes.inputRoot} `,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
}

export default Search;
