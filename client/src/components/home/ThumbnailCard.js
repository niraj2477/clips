import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { indexPage, indexPageWithCat } from "../../apis/Video";
import { Link } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ReportIcon from "@material-ui/icons/Report";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { getCategory } from "../../apis/Category";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
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
  root1: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    overflow: "auto",
    maxWidth: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize: "15px",
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
function SimpleDialog(props) {
  const { onClose, selectedId, open } = props;
  const [checked, setChecked] = React.useState([0]);
  const menus = [
    "sexual content",
    "violent or replusive content",
    "hateful or abusive content",
    "harmful or dangerous content",
    "spam or misleading",
  ];
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleClose = () => {
    onClose(selectedId);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {menus.map((menu) => (
          <ListItem
            key={menu}
            role={undefined}
            dense
            button
            onClick={handleToggle(menu)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(menu) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={menu} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedId: PropTypes.string.isRequired,
};
class ThumbnailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      v: null,
      anchor: null,
      open: false,
      id: null,
      category: [],
    };
  }
  getCat = () => {
    getCategory().then((response) => {
      this.setState({ category: response.data });
    });
  };
  componentDidMount() {
    this.getCat();
    indexPage(this.state.v).then((response) => {
      if (response.data.length > 0) {
        this.setState({ video: response.data });
        this.setState({ v: this.state.video[0]._id });
      }
    });
  }
  handleChipClick = (value) => {
    console.log(value);

    indexPageWithCat(value).then((response) => {
      console.log(response.data);
      //  if (response.data.length > 0) {
      //    this.setState({ video: response.data });
      //    this.setState({ v: this.state.video[0]._id });
      //  }
    });
  };
  handleClick = (event) => {
    this.setState({ anchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  showReport = () => {
    this.setState({ open: true });
  };
  check = (event, id) => {
    this.setState({ id: id });
    this.handleClick(event);
    console.log(this.state.id);
  };
  hideReport = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
      <div>
        <Divider variant="middle" />
        <div component="ul" className={classes.root1}>
          {this.state.category.map((data) => {
            return (
              <li key={data._id}>
                <Chip
                  label={data.name}
                  clickable={true}
                  className={classes.chip}
                  onClick={() => {
                    this.handleChipClick(data._id);
                  }}
                />
              </li>
            );
          })}
        </div>
        <Divider variant="middle" />
        <Grid container>
          <SimpleDialog
            selectedId={this.state.id}
            open={this.state.open}
            onClose={this.hideReport}
          />
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
                            onClick={(event) => {
                              this.check(event, item._id);
                            }}
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
