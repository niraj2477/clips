import React, { Component } from "react";
import { watch } from "../../apis/video";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ReactPlayer from "react-player";
import Box from "@material-ui/core/Box";
import HoverVideoPlayer from "react-hover-video-player";
import Typography from "@material-ui/core/Typography";
import Chips from "../home/Chips";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  player: {
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
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
    // [theme.breakpoints.down("sm")]: {
    //   width: 380,
    //   height: 200,
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: 300,
    // },
    width: 200,
    height: 180,
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
  textLink: {
    color: "inherit",
    textDecoration: " inherit",
  },
  playListBox: {
    overflowX: "hidden",
    overflowY: "auto",
    height: 450,
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(5),
  },
  playList: {
    marginLeft: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  chips: {
    marginLeft: theme.spacing(11.8),
    marginRight: theme.spacing(10),
  },
  videoInfo: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(5),
  },
  videoButtons: {
    marginLeft: theme.spacing(15),
    marginTop: theme.spacing(-1.5),
  },
});
export class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      comments: [],
      isOpen: true,
    };
  }
  componentDidMount() {
    const currentURL = window.location.href;
    const myArray = currentURL.split("/");
    watch(myArray[5]).then((response) => {
      this.setState({ video: response.data });
    });
  }
  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { classes } = this.props;
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div className={classes.player}>
              <ReactPlayer
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                onContextMenu={(e) => e.preventDefault()}
                url={this.state.video.file}
                light={this.state.video.thumbnail}
                pip
                controls
                playing
              />
            </div>
            <div className={classes.videoInfo}>
              <div>
                <Typography gutterBottom variant="h5">
                  {this.state.video.title}
                </Typography>
              </div>
              <Grid container>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    {`${this.state.video.views} views • ${formatDate(
                      this.state.video.createdAt
                    )}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <div className={classes.videoButtons}>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>

                    <IconButton>
                      <InsertEmoticonIcon />
                    </IconButton>

                    <IconButton>
                      <SentimentVeryDissatisfiedIcon />
                    </IconButton>

                    <IconButton>
                      <SendIcon />
                    </IconButton>

                    <IconButton edge="end">
                      <MoreHorizIcon />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.chips}>
              <Chips />
            </div>
            <div className={classes.playListBox}>
              <Box clone={true}>
                <Box className={classes.box} id={this.state.video._id}>
                  <Grid container>
                    <Grid item>
                      <div className={classes.image}>
                        <HoverVideoPlayer
                          videoSrc={this.state.video.file}
                          crossOrigin
                          loadingOverlay={
                            <div className="loading-overlay">Loading...</div>
                          }
                          pausedOverlay={
                            <img
                              src={this.state.video.thumbnail}
                              alt="e"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <div className={classes.playList}>
                        <div className={classes.title}>
                          <img
                            className={classes.avatar}
                            alt={this.state.video.title}
                            src={this.state.video.thumbnail}
                          />
                          <Typography gutterBottom variant="body2">
                            {this.state.video.title}
                          </Typography>
                          {/* <div className={classes.iconButton}>
                      <IconButton edge="end" color="inherit">
                        <MoreVertIcon />
                      </IconButton>
                    </div> */}
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
                            {`${this.state.video.views} • ${formatDate(
                              this.state.video.createdAt
                            )}`}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Watch);