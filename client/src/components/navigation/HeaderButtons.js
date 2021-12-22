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
// import { gapi, loadAuth2WithProps } from "gapi-script";
// import { useCookies } from "react-cookie";
import Avatar from "@material-ui/core/Avatar";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Auth } from "../../firebaseConfig";
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
}));
export default function HeaderButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const theme = useSelector((state) => state.theme);
  const handleThemeChange = () => {
    dispatch(isDark());
  };
  // const [cookies, setCookie] = useCookies(["access_token"]);

  // useEffect(() => {
  //   const setAuth2 = async () => {
  //     const auth2 = await loadAuth2WithProps(gapi, {
  //       client_id:
  //         "448780662862-h7odin62q1oi27qeipd2a50fjs8ej1cn.apps.googleusercontent.com",
  //       cookiepolicy: "single_host_origin",
  //     });
  //     if (auth2.isSignedIn.get()) {
  //       //gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse();
  //       updateUser(auth2.currentUser.get());
  //     } else {
  //       attachSignin(document.getElementById("googleLogin"), auth2);
  //       attachSignin(document.getElementById("googleLoginIcon"), auth2);
  //     }
  //   };
  //   setAuth2();
  // }, []);
  // useEffect(() => {
  //   if (!user) {
  //     const setAuth2 = async () => {
  //       const auth2 = await loadAuth2WithProps(gapi, {
  //         client_id:
  //           "448780662862-h7odin62q1oi27qeipd2a50fjs8ej1cn.apps.googleusercontent.com",
  //         cookiepolicy: "single_host_origin",
  //       });
  //       if (auth2.isSignedIn.get()) {
  //         //gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse();
  //         updateUser(auth2.currentUser.get());
  //       } else {
  //         attachSignin(document.getElementById("googleLogin"), auth2);
  //         attachSignin(document.getElementById("googleLoginIcon"), auth2);
  //       }
  //     };
  //     setAuth2();
  //   }
  // }, [user]);
  // const updateUser = (currentUser) => {
  //   const name = currentUser.getBasicProfile().getName();
  //   const profileImg = currentUser.getBasicProfile().getImageUrl();
  //   const email = currentUser.getBasicProfile().getEmail();
  //   setUser({
  //     name: name,
  //     profileImg: profileImg,
  //     email: email,
  //   });
  //   console.log(user);
  // };
  // const attachSignin = (element, auth2) => {
  //   auth2.attachClickHandler(
  //     element,
  //     {},
  //     (googleUser) => {
  //       updateUser(googleUser);
  //     },
  //     (error) => {
  //       console.log(JSON.stringify(error));
  //     }
  //   );
  // };

  // const signOut = () => {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(() => {
  //     setUser(null);
  //     console.log("User signed out.");
  //   });
  // };
  const logOut = () => {
    signOut(Auth).then(() => {
      setUser(null);
      console.log("User signed out.");
    });
  };
  const signIn = () => {
    signInWithPopup(Auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
      //  const credential = GoogleAuthProvider.credentialFromResult(result);
       // const token = credential.accessToken;
        // The signed-in user info.
        const u = result.user;
        setUser({
          name: u.displayName,
          email: u.email,
          profileImg: u.photoURL,
        });
        console.log(u);
        // ...
      })
      .catch(alert);
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
      {user == null ? (
        <div className={classes.buttonDiv}>
          <Button
            variant="outlined"
            color="primary"
            //id="googleLogin"
            onClick={signIn}
            className={` ${classes.removeBlock}`}
            startIcon={<AccountCircleIcon />}
          >
            Login
          </Button>
          <IconButton
            edge="end"
            onClick={signIn}
            //id="googleLoginIcon"
            className={`${classes.iconButton} ${classes.removeIcon}`}
            color="primary"
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
      ) : (
        <div className={classes.buttonDiv}>
          {/* <Button
            variant="outlined"
            color="primary"
            id="googleLogin"
            className={` ${classes.removeBlock}`}
            startIcon={<AccountCircleIcon />}
          >
            Login
          </Button>
          <IconButton
            edge="end"
            id="googleLogin"
            className={`${classes.iconButton} ${classes.removeIcon}`}
            color="primary"
          >
            <AccountCircleIcon />
          </IconButton> */}
          <Avatar alt={user.name} src={user.profileImg} onClick={logOut} />
        </div>
      )}
    </div>
  );
}
