import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { indexPage } from "../../apis/Video";
import { Link } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ReportIcon from "@material-ui/icons/Report";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import CommentIcon from "@material-ui/icons/Comment";
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
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      width: 380,
      height: 200,
    },
    [theme.breakpoints.up("md")]: {
      width: 300,
    },
    height: 170,
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
});

class ThumbnailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      v: null,
      anchor: null,
      anchor1: null,
      visible: false,
      checked: [0],
    };
  }

  componentDidMount() {
    indexPage(this.state.v).then((response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        this.setState({ video: response.data });
        this.setState({ v: this.state.video[0]._id });
      }
    });
  }

  handleClick = (event) => {
    this.setState({ anchor: event.currentTarget });
  };
  handleToggle = (value) => () => {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };
  showReport = (event) => {
    this.setState({ anchor1: event.currentTarget });
   
  };
  render() {
    const { classes } = this.props;
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
      <div>
        <Grid container>
          {this.state.video.map((item) => {
            return (
              <Grid item xs={12} sm={12} md={4} lg={3} key={item._id}>
                <Box clone={true}>
                  <Box className={classes.box} id={item._id}>
                    <Link
                      to={{
                        pathname: "/videos/watch/" + item._id,
                      }}
                      className={classes.textLink}
                    >
                      <div className={classes.image}>
                        <HoverVideoPlayer
                          videoSrc={item.file}
                          crossOrigin
                          loadingOverlay={
                            <div className="loading-overlay">Loading...</div>
                          }
                          pausedOverlay={
                            <img
                              src={item.thumbnail}
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
                    </Link>

                    <Box pr={4}>
                      <div className={classes.title}>
                        <img
                          className={classes.avatar}
                          alt={item.title}
                          src={item.thumbnail}
                        />
                        <Link
                          to={{
                            pathname: "/videos/watch/" + item._id,
                          }}
                          className={classes.textLink}
                        >
                          <Typography gutterBottom variant="body2">
                            {item.title}
                          </Typography>
                        </Link>

                        <div className={classes.iconButton}>
                          <IconButton
                            edge="end"
                            color="inherit"
                            onClick={this.handleClick}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchor}
                            keepMounted
                            open={Boolean(this.state.anchor)}
                            onClose={this.handleClose}
                          >
                            <MenuItem onClick={this.showReport}>
                              <ReportIcon />
                              <Typography
                                gutterBottom
                                variant="body2"
                                style={{ padding: 5 }}
                              >
                                Report
                              </Typography>
                              <Menu
                                id="fade-menu"
                                anchorEl={this.state.anchor1}
                                keepMounted
                                open={Boolean(this.state.anchor1)}
                              >
                                <List className={classes.root}>
                                  {[0, 1, 2, 3].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                      <ListItem
                                        key={value}
                                        role={undefined}
                                        dense
                                        button
                                        onClick={this.handleToggle(value)}
                                      >
                                        <ListItemIcon>
                                          <Checkbox
                                            edge="start"
                                            checked={
                                              this.state.checked.indexOf(
                                                value
                                              ) !== -1
                                            }
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                              "aria-labelledby": labelId,
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          id={labelId}
                                          primary={`Line item ${value + 1}`}
                                        />
                                        <ListItemSecondaryAction>
                                          <IconButton
                                            edge="end"
                                            aria-label="comments"
                                          >
                                            <CommentIcon />
                                          </IconButton>
                                        </ListItemSecondaryAction>
                                      </ListItem>
                                    );
                                  })}
                                </List>
                              </Menu>
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                      <Link
                        to={{
                          pathname: "/videos/watch/" + item._id,
                        }}
                        className={classes.textLink}
                      >
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
                      </Link>
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
