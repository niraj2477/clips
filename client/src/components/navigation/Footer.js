import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
    display: "none",
  },
  textLink: {
    color: "inherit",
    textDecoration: " inherit",
  },
  leftButtonPadding: {
    paddingLeft: theme.spacing(3),
  },
  rightButtonPadding: {
    paddingLeft: theme.spacing(10),
  },
  endButtonPadding: {
    paddingLeft: theme.spacing(4),
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");
  const theme = useSelector((state) => state.theme);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      color="text"
      style={
        theme.isDark ? { background: "#181818" } : { background: "#f9f9f9" }
      }
    >
      <Link to="/video/create" className={classes.textLink}>
        <Fab color="primary" aria-label="add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
      </Link>

      <BottomNavigationAction
        className={classes.leftButtonPadding}
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        className={classes.leftButtonPadding}
        value="favorites"
        icon={<FavoriteIcon />}
      />

      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        className={classes.rightButtonPadding}
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="Folder"
        value="folder"
        className={classes.endButtonPadding}
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
