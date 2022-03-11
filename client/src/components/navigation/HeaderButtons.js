/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import Avatar from "@material-ui/core/Avatar";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Auth } from "../../firebaseConfig";
import { useCookies } from "react-cookie";
import { isAuthenticated } from "../../actions/authAction";
import { authenticate } from "../../apis/Authentication";
import Popup from './Popup'
import Details from './Details'
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
  const [openPopup,setOpenPopup] = useState(false)
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const provider = new GoogleAuthProvider();
  const auth = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);
  const handleThemeChange = () => {
    dispatch(isDark());
  };

  // useEffect(() => {
  //   if (auth.auth) {
  //     var data = {
  //       name: decodeURI(cookie.name),
  //       avatar: decodeURI(cookie.avatar),
  //       email: decodeURI(cookie.email),
  //       token: decodeURI(cookie.token),
  //     };
  //     authenticate(JSON.stringify(data))
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [cookie, auth]);
  const logOut = () => {
    signOut(Auth).then(() => {
      removeCookie("name");
      removeCookie("email");
      removeCookie("token");
      removeCookie("avatar");
      removeCookie("loggedIn");
      removeCookie("id");
    });
    dispatch(isAuthenticated());
  };
  const signIn = () => {
    signInWithPopup(Auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setCookie("id", encodeURI(user._id), {
          maxAge: 3652,
        });
        setCookie("name", encodeURI(user.displayName), {
          maxAge: 3652,
        });
        setCookie("email", encodeURI(user.email), {
          maxAge: 3652,
        });
        setCookie("avatar", encodeURI(user.photoURL), {
          maxAge: 3652,
        });
        setCookie("accessToken", encodeURI(user.accessToken), {
          maxAge: 3652,
        });
        setCookie("loggedIn", true, { maxAge: 3652 });
        //dispatch redux authentication
        dispatch(isAuthenticated());
        // api call to  server for checking and storeing data
        var data = {
          name: user.displayName,
          avatar: user.photoURL,
          email: user.email,
          googleId: user.uid,
          accessToken: user.accessToken,
        };
        authenticate(JSON.stringify(data))
          .then((response) => {
            if(response.data.flag === 1){
              setOpenPopup(true);
            }
            console.log(response);
         
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch(alert);
  };
  return (

    
    <div>
     
     <Popup
        openPopup ={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Details setOpenPopup={setOpenPopup} />
      </Popup>

 
      <IconButton edge="end" className={classes.iconButton} color="inherit">
        <NotificationsIcon />
      </IconButton>

      <Link to={VIDEO_CREATE} className={classes.textLink}>
        <IconButton
          edge="end"
          className={`${classes.iconButton} ${classes.removeBlock}`}
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
      {auth.auth === false ? (
        <div className={classes.buttonDiv}>
          <Button
            variant="outlined"
            color="primary"
            onClick={signIn}
            className={` ${classes.removeBlock}`}
            startIcon={<AccountCircleIcon />}
          >
            Login
          </Button>
          <IconButton
            edge="end"
            onClick={signIn}
            className={`${classes.iconButton} ${classes.removeIcon}`}
            color="primary"
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
      ) : (
        <div className={classes.avatarDiv}>
          <Avatar
            alt={decodeURI(cookie.name)}
            src={decodeURI(cookie.avatar)}
            onClick={logOut}
            className={classes.avatarIcon}
          />
        </div>
      )}
    </div>
  );
}
