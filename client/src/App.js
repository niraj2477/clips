import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import Chips from "./components/home/Chips";
import ThumbnailCard from "./components/home/ThumbnailCard";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(8),
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.only("md")]: {
      marginTop: theme.spacing(8),
      paddingLeft: theme.spacing(2),
    },
    padding: theme.spacing(2),
  },
}));
export default function App() {
  const theme = useSelector((state) => state.theme);
  const classes = useStyles();
  const palletType = theme.isDark ? "dark" : "light";
  const mainPrimaryColor = theme.isDark ? "#d62d20" : "#cc2a36";
  const primaryTextColor = theme.isDark ? "#fff" : "#030303";
  const secondaryTextColor = theme.isDark ? "#aaa" : "#606060";
  const mainbackgroundColor = theme.isDark ? "#181818" : "#f9f9f9";
  const Theme = createTheme({
    palette: {
      type: palletType,
      background: {
        default: mainbackgroundColor,
      },
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainPrimaryColor,
      },
      text: {
        primary: primaryTextColor,
        secondary: secondaryTextColor,
      },
     
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Header />
      <main className={classes.root}>
        <Chips />
        <ThumbnailCard/>
      </main>

      <Footer />
    </ThemeProvider>
  );
}
