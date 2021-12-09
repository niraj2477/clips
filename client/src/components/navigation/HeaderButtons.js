import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { isDark } from "../../actions/themeAction";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Link } from "react-router-dom";
import { VIDEO_CREATE } from "../../helpers/constants";
const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginRight: theme.spacing(0.5),
  },
  textLink: {
    color: "inherit",
    textDecoration: " inherit",
  },
  removeBlock: {
    [theme.breakpoints.down("md")]: {
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
      <IconButton edge="end" className={classes.iconButton} color="inherit">
        <NotificationsIcon />
      </IconButton>

      <Link to={VIDEO_CREATE} className={classes.textLink}>
        <IconButton
          edge="end"
          className={`${classes.iconButton} ${classes.removeBlock}`}
          color="inherit"
        >
          <VideoCallIcon />
        </IconButton>
      </Link>

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

      <Button
        variant="outlined"
        color="primary"
        className={` ${classes.removeBlock}`}
        startIcon={<AccountCircleIcon />}
      >
        Login
      </Button>
      <IconButton
        edge="end"
        className={`${classes.iconButton} ${classes.removeIcon}`}
        color="primary"
      >
        <AccountCircleIcon />
      </IconButton>
    </div>
  );
}
