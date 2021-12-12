import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import Route from "./route/Index";
import { BrowserRouter } from "react-router-dom";
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
  textLink: {
    color: "inherit",
    textDecoration: " inherit",
  },
  "@global": {
    "*": {
      "scrollbar-width": "thin",
    },
    "*::-webkit-scrollbar": {
      width: "4px",
      height: "4px",
    },
    " *::-webkit-scrollbar-thumb": {
      borderRadius: 8,
      backgroundColor: "#d62d20",
      minHeight: 24,
      border: "3px solid #d62d20",
    },
    // " *::-webkit-scrollbar-thumb:focus": {
    //   backgroundColor: "#959595",
    // },
    // "*::-webkit-scrollbar-thumb:active": {
    //   backgroundColor: "#959595",
    // },
    // " *::-webkit-scrollbar-thumb:hover": {
    //   backgroundColor: "#959595",
    // },
    // " *::-webkit-scrollbar-corner": {
    //   backgroundColor: "#2b2b2b",
    // },
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
      <BrowserRouter>
        <Header />
        <main className={classes.root}>
          <Route />
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
