import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  box: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    boxShadow: 8,
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      width: 380,
      height: 180,
    },
    [theme.breakpoints.up("md")]: {
      width: 300,
    },
    height: 150,
  },
  title: {
    display: "flex",
    flexWrap: "nowrap",

    justifyContent: "left",
  },
  avatar: {
    padding: theme.spacing(0.5),
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  description: {
    marginLeft: theme.spacing(6),
  },
}));

const data = [
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396 k views",
    createdAt: "a week ago",
  },
  {
    src: "https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA",
    title: "Queen - Greatest Hits",
    channel: "Queen Official",
    views: "40 M views",
    createdAt: "3 years ago",
  },
  {
    src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
    title: "Calvin Harris, Sam Smith - Promises (Official Video)",
    channel: "Calvin Harris",
    views: "130 M views",
    createdAt: "10 months ago",
  },
  {
    src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
    title: "Calvin Harris, Sam Smith - Promises (Official Video)",
    channel: "Calvin Harris",
    views: "130 M views",
    createdAt: "10 months ago",
  },
  {
    src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
    title: "Calvin Harris, Sam Smith - Promises (Official Video)",
    channel: "Calvin Harris",
    views: "130 M views",
    createdAt: "10 months ago",
  },
  {
    src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
    title: "Calvin Harris, Sam Smith - Promises (Official Video)",
    channel: "Calvin Harris",
    views: "130 M views",
    createdAt: "10 months ago",
  },
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396 k views",
    createdAt: "a week ago",
  },
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396 k views",
    createdAt: "a week ago",
  },
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396 k views",
    createdAt: "a week ago",
  },
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396 k views",
    createdAt: "a week ago",
  },
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396 k views",
    createdAt: "a week ago",
  },
];

export default function ThumbnailCard() {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        {data.map((item) => {
          return (
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Box clone={true}>
                <Box className={classes.box}  >
                  <img
                    className={classes.image}
                    alt={item.title}
                    src={item.src}
                  />

                  <Box pr={2}>
                    <div className={classes.title}>
                      <img
                        className={classes.avatar}
                        alt={item.title}
                        src={item.src}
                      />
                      <Typography gutterBottom variant="body2">
                        {item.title}
                      </Typography>
                    </div>
                    <div className={classes.description}>
                      <Typography
                        display="block"
                        variant="caption"
                        color="textSecondary"
                      >
                        {item.channel}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {`${item.views} • ${item.createdAt}`}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
