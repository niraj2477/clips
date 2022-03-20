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
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { useSelector, useDispatch } from "react-redux";

import {
  _HOME,
  HOME,
  SUBCRIPTIONS,
  TRENDING,
  HELP,
  SETTING,
  GAMING,
  LIBRARY,
  HISTORY,
  LEARNING,
  FEEDBACK,
  YOURVIDEOS,
} from "../../helpers/constants";
import {
  isHome,
  isHelp,
  isSetting,
  isGaming,
  isHistory,
  isLearning,
  isFeedback,
  isYourVideos,
  isLibrary,
  isSubscriptions,
  isTrending,
} from "../../actions/navigationAction";
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
        <List>
          <ListItem
            button
            key={HOME}
            component={Link}
            to={HOME}
            selected={navigation.selected === HOME}
            onClick={() => dispatch(isHome())}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={_HOME} />
          </ListItem>

          <ListItem
            button
            key={TRENDING}
            component={Link}
            to={TRENDING}
            selected={navigation.selected === TRENDING}
            onClick={() => dispatch(isTrending())}
          >
            <ListItemIcon>
              <WhatshotIcon />
            </ListItemIcon>
            <ListItemText primary={TRENDING} />
          </ListItem>
          <ListItem
            button
            key={SUBCRIPTIONS}
            selected={navigation.selected === SUBCRIPTIONS}
            onClick={() => dispatch(isSubscriptions())}
          >
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary={SUBCRIPTIONS} />
          </ListItem>
        </List>
        <Divider variant="middle" />
        <List>
          <ListItem
            button
            key={LIBRARY}
            selected={navigation.selected === LIBRARY}
            onClick={() => dispatch(isLibrary())}
          >
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={LIBRARY} />
          </ListItem>
          <ListItem
            button
            key={HISTORY}
            selected={navigation.selected === HISTORY}
            onClick={() => dispatch(isHistory())}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={HISTORY} />
          </ListItem>
          <ListItem
            button
            key={YOURVIDEOS}
            selected={navigation.selected === YOURVIDEOS}
            onClick={() => dispatch(isYourVideos())}
          >
            <ListItemIcon>
              <PlayCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={YOURVIDEOS} />
          </ListItem>
        </List>
        <Divider variant="middle" />
        <div className={classes.typographyDiv}>
          <Typography
            variant="overline"
            align="center"
            className={classes.typography}
            color="textSecondary"
          >
            MORE FROM CLIPS
          </Typography>
        </div>

        <List>
          <ListItem
            button
            key={GAMING}
            selected={navigation.selected === GAMING}
            onClick={() => dispatch(isGaming())}
          >
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary={GAMING} />
          </ListItem>
          <ListItem
            button
            key={LEARNING}
            selected={navigation.selected === LEARNING}
            onClick={() => dispatch(isLearning())}
          >
            <ListItemIcon>
              <EmojiObjectsIcon />
            </ListItemIcon>
            <ListItemText primary={LEARNING} />
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
          <ListItem
            button
            key={HELP}
            selected={navigation.selected === HELP}
            onClick={() => dispatch(isHelp())}
          >
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={HELP} />
          </ListItem>
          <ListItem
            button
            key={FEEDBACK}
            component={Link}
            to={FEEDBACK}
            selected={navigation.selected === FEEDBACK}
            onClick={() => dispatch(isFeedback())}
          >
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary={FEEDBACK} />
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
