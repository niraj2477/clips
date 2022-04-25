import React, { Component } from "react";
import {
  watch,
  watchComplete,
  like,
  disLike,
  indexPageWithCat,
  suscribe,
  checkSuscribe,
} from "../../apis/Video";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ReactPlayer from "react-player";
import Box from "@material-ui/core/Box";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import HoverVideoPlayer from "react-hover-video-player";
import Typography from "@material-ui/core/Typography";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Chip from "@material-ui/core/Chip";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Divider } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Topcommentbox from "../commentbox/topcommentbox/Topcommentbox";
import MessageScroll from "../commentbox/MessageScroll";
import { RWebShare } from "react-web-share";
import { connect } from "react-redux";
import { nFormatter } from "../../helpers/Formatter";
import { getCategory } from "../../apis/Category";
import { getComments } from "../../apis/Comment";
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
  chipRoot: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(12),
    margin: 0,
    overflow: "auto",
    maxWidth: "auto",
  },
  mainChip: {
    margin: theme.spacing(0.5),
    fontSize: "15px",
  },
  image: {
  
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
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(-1.5),
  },
  row: {
    padding: theme.spacing(2),
  },
  commentFilter: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(-1.5),
  },
  divider: {
    marginLeft: theme.spacing(11),
  },
});
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export class Watch extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      video: [],
      comments: [],
      id: cookies.get("id") || null,
      recommend: [],
      isOpen: true,
      playedTime: 0.0,
      watchCompleted: false,
      cUrl: window.location.href,
      isDisLike: true,
      isLike: true,
      auth: this.props.auth,
      category: [],
      subsButton:true
    };
  }
  getCat = () => {
    getCategory().then((response) => {
      this.setState({ category: response.data });
    });
  };

  getComments = () => {
    getComments().then((response) => {
      this.setState({ comments: response.data });
    });
  };
  checkSus = () => {
    console.log(this.state.video.channelId);
    // checkSuscribe(this.state.video.channelId, this.state.id).then(
    //   (response) => {
    //     console.log(response);
    //   }
    // );
  };
  componentDidMount() {
    this.getCat();

    this.getComments();
    //console.log(this.state.auth.auth);
    if (this.state.auth.auth === true) {
      this.setState({ isDisLike: false, isLike: false });
    } else {
      this.setState({ isDisLike: true, isLike: true });
    }
    let currentURL = window.location.href;
    const myArray = currentURL.split("/");
    watch(myArray[5]).then((response) => {
      this.setState({ video: response.data });
      checkSuscribe(this.state.video.channelId, this.state.id).then(
        (response) => {
          //console.log(response);
          this.setState({ subsButton: response });
        }
      );
    });
  }
  componentDidUpdate(prevProps) {
    if (this.state.watchCompleted !== prevProps.watchCompleted) {
      if (this.state.watchCompleted) {
        watchComplete(this.state.video._id).then((response) => {});
      }
    }
  }
  handleChipClick = (value) => {
    indexPageWithCat(value).then((response) => {
      this.setState({ recommend: response.data });
      this.setState({ v: this.state.video[0]._id });
    });
  };
  handleLike = () => {
    like(this.state.video._id).then((response) => {
      console.log(response);
    });
  };

  handleDisLike = () => {
    disLike(this.state.video._id).then((response) => {
      console.log(response);
    });
  };
  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleSuscribe = () => {
    suscribe(this.state.video.channelId, this.state.id).then((result) => {
      console.log(result);
    });
  };
  render() {
    const { classes } = this.props;
    const titleString = (title) => {
      const shorten = title ? title.substring(0, 20) : "";
      return shorten;
    };
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const updateProgress = ({ played }) => {
      if (played > 0.7 && !this.state.watchCompleted) {
        this.setState({ watchCompleted: true });
      }
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
                onProgress={updateProgress}
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
                    {`${nFormatter(
                      this.state.video.views
                    )} views • ${formatDate(this.state.video.createdAt)}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <div className={classes.videoButtons}>
                    <IconButton
                      onClick={this.handleLike}
                      disabled={this.state.isLike}
                    >
                      <FavoriteIcon />
                    </IconButton>

                    <IconButton
                      onClick={this.handleDisLike}
                      disabled={this.state.isDisLike}
                    >
                      <ThumbDownIcon />
                    </IconButton>

                    <RWebShare
                      data={{
                        url: this.state.currentURL,
                        title: this.state.video.title,
                      }}
                      onClick={() => console.log("shared successfully!")}
                    >
                      <IconButton>
                        <SendIcon />
                      </IconButton>
                    </RWebShare>

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={this.state.subsButton}
                      onClick={this.handleSuscribe}
                    >
                      Suscribe
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <Divider variant="middle" className={classes.divider} />

              <div className={classes.row}>
                <Grid container>
                  <Grid item>
                    <Typography>Comments</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.commentFilter}>
                      <FilterListIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>

              <div className="ColHolder">
                <Topcommentbox autoFocus={false} video={this.state.video} />
                <MessageScroll comments= {this.state.comments} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div component="ul" className={classes.chipRoot}>
              <li>
                <Chip
                  label="All"
                  clickable={true}
                  className={classes.mainChip}
                  onClick={() => {
                    this.handleChipClick(null);
                  }}
                />
              </li>
              {this.state.category.map((data) => {
                return (
                  <li key={data._id}>
                    <Chip
                      label={data.name}
                      clickable={true}
                      className={classes.mainChip}
                      onClick={() => {
                        this.handleChipClick(data._id);
                      }}
                    />
                  </li>
                );
              })}
            </div>
            <div className={classes.playListBox}>
              <Box clone={true}>
                {this.state.recommend.length > 0 ? (
                  this.state.recommend.map((data) => {
                    return (
                      <Box className={classes.box} id={data._id}>
                        <Grid container>
                          <Grid item>
                            <div className={classes.image}>
                              <HoverVideoPlayer
                                videoSrc={data.file}
                                crossOrigin
                                loadingOverlay={
                                  <div className="loading-overlay">
                                    Loading...
                                  </div>
                                }
                                pausedOverlay={
                                  <img
                                    src={data.thumbnail}
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
                                  alt={data.title}
                                  src={data.thumbnail}
                                />

                                <Typography>
                                  {titleString(data.title)}...
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
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  {`${nFormatter(data.views)} • ${formatDate(
                                    data.createdAt
                                  )}`}
                                </Typography>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })
                ) : (
                  <p>d</p>
                )}
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default connect(mapStateToProps)(withStyles(styles)(withCookies(Watch)));
