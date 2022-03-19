import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { useSelector, useDispatch } from "react-redux";
import { _HOME, CATEGORY, SETTING } from "../../helpers/constants";
import { isSetting, isCategory } from "../../actions/navigationAction";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  typographyDiv: {
    display: "flex",
    justifyContent: "center",
  },
  typography: {
    fontSize: 15,
  },
}));

export default function Drawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.navigation);
  const [state, toggleDrawer] = useDrawerHelper();

  // navigation list items which are shown in the drawer
  const NavigationList = () => {
    return (
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        className={classes.list}
      >
        <Divider variant="middle" />
        <div className={classes.typographyDiv}>
          <Typography
            variant="overline"
            align="center"
            className={classes.typography}
            color="textSecondary"
          >
            CLIPS
          </Typography>
        </div>

        <List>
          <ListItem
            button
            key={CATEGORY}
            component={Link}
            to={CATEGORY}
            selected={navigation.selected === CATEGORY}
            onClick={() => dispatch(isCategory())}
          >
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary={CATEGORY} />
          </ListItem>
        </List>
        <Divider variant="middle" />
        <List>
          <ListItem
            button
            key={SETTING}
            selected={navigation.selected === SETTING}
            onClick={() => dispatch(isSetting())}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={SETTING} />
          </ListItem>
        </List>
      </div>
    );
  };
  return (
    <div>
      <React.Fragment>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          onClick={toggleDrawer(true)}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={state.open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <NavigationList />
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
// custom react hook for toggleDrawer
function useDrawerHelper() {
  const [state, setState] = useState({
    open: false,
  });
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ open: open });
  };
  return [state, toggleDrawer];
}
