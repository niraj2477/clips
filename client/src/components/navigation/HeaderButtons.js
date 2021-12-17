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
import { GoogleLogin } from "react-google-login";
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
}));
export default function HeaderButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const handleThemeChange = () => {
    dispatch(isDark());
  };
  const responseGoogle = (response) => {
    console.log(response);
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
      {/* <GoogleLogin
        clientId="448780662862-h7odin62q1oi27qeipd2a50fjs8ej1cn.apps.googleusercontent.com"
        render={(renderProps) => (
          <div>
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
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
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <AccountCircleIcon />
            </IconButton>
          </div>
        )}
      
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}
    </div>
  );
}
