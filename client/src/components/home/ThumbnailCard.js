import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { indexPage } from "../../apis/video";

const styles = (theme) => ({
  box: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    boxShadow: 8,
    "&:hover, &:focus": {
      cursor: "pointer",
    },
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
  iconButton: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(43),
    },
    position: "absolute",
    marginLeft: theme.spacing(34),
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
});

class ThumbnailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      v: null,
    };
  }
  componentDidMount() {
    indexPage(this.state.v).then((response) => {
      this.setState({ video: response.data });
      this.setState({ v: this.state.video[0]._id });
      console.log(this.state.video);
    });
  }

  render() {
    const { classes } = this.props;
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const data = [
      {
        id: 1,
        src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
        title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
        channel: "Don Diablo",
        views: "396 k views",
        createdAt: "a week ago",
      },
      {
        id: 2,
        src: "https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA",
        title: "Queen - Greatest Hits",
        channel: "Queen Official",
        views: "40 M views",
        createdAt: "3 years ago",
      },
      {
        id: 3,
        src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
        title: "Calvin Harris, Sam Smith - Promises (Official Video)",
        channel: "Calvin Harris",
        views: "130 M views",
        createdAt: "10 months ago",
      },
      {
        id: 4,
        src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
        title: "Calvin Harris, Sam Smith - Promises (Official Video)",
        channel: "Calvin Harris",
        views: "130 M views",
        createdAt: "10 months ago",
      },
      {
        id: 5,
        src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
        title: "Calvin Harris, Sam Smith - Promises (Official Video)",
        channel: "Calvin Harris",
        views: "130 M views",
        createdAt: "10 months ago",
      },
      {
        id: 6,
        src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
        title: "Calvin Harris, Sam Smith - Promises (Official Video)",
        channel: "Calvin Harris",
        views: "130 M views",
        createdAt: "10 months ago",
      },
      {
        id: 7,
        src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
        title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
        channel: "Don Diablo",
        views: "396 k views",
        createdAt: "a week ago",
      },
      {
        id: 8,
        src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
        title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
        channel: "Don Diablo",
        views: "396 k views",
        createdAt: "a week ago",
      },
      {
        id: 9,
        src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
        title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
        channel: "Don Diablo",
        views: "396 k views",
        createdAt: "a week ago",
      },
      {
        id: 10,
        src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
        title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
        channel: "Don Diablo",
        views: "396 k views",
        createdAt: "a week ago",
      },
      {
        id: 11,
        src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
        title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
        channel: "Don Diablo",
        views: "396 k views",
        createdAt: "a week ago",
      },
    ];
    return (
      <div>
        <Grid container>
          {this.state.video.map((item) => {
            return (
              <Grid item xs={12} sm={12} md={4} lg={3} key={item._id}>
                <Box clone={true}>
                  <Box
                    className={classes.box}
                    onClick={() => {
                      console.log("card clicked");
                    }}
                  >
                    <img
                      className={classes.image}
                      alt={item.title}
                      src={item.thumbnail}
                    />

                    <Box pr={4}>
                      <div className={classes.title}>
                        <img
                          className={classes.avatar}
                          alt={item.title}
                          src={item.thumbnail}
                        />
                        <Typography gutterBottom variant="body2">
                          {item.title}
                        </Typography>
                        <div className={classes.iconButton}>
                          <IconButton edge="end" color="inherit">
                            <MoreVertIcon />
                          </IconButton>
                        </div>
                      </div>
                      <div className={classes.description}>
                        {/* <Typography
                          display="block"
                          variant="caption"
                          color="textSecondary"
                        >
                          {item.channel}
                        </Typography> */}
                        <Typography variant="caption" color="textSecondary">
                          {`${item.views} • ${formatDate(item.createdAt)}`}
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
}
export default withStyles(styles)(ThumbnailCard);
