import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { HISTORY } from "../../helpers/constants";
import Divider from "@material-ui/core/Divider";
import { nFormatter } from "../../helpers/Formatter";
import { withCookies, Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { PlaylistVideoFun } from "../../apis/UserPlaylist";
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
  },
  box1: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(6),
    },
    boxShadow: 8,
  },
  iconButton: {
    display: "flex",
    justifyContent: "flex-end",
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
  root: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(25),
    },
  },
  typography: {
    fontSize: 20,
  },
  cursor: {
    "&:hover, &:focus": {
      cursor: "pointer",
    },
  },
});
const mapStateToProps = (state) => ({
  auth: state.auth,
});
class PlaylistVideoList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
      };
  constructor(props) {
    super(props);
    
    const { cookies } = props;
    this.state = {
      video: [],
      history:[],
      v: null,
      id:cookies.get("id") || null,
    };
  }

 
 
  fetchVideoAsPerPlaylist = (id) =>{
    PlaylistVideoFun(id).then((res)=>{
        this.setState({ video: res.data });
    })
  }
  componentDidMount() {
   
    let currentURL = window.location.href;
    const myArray = currentURL.split("/");
   this.fetchVideoAsPerPlaylist(myArray[5])
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="overline"
              className={classes.typography}
              color="textSecondary"
            >
              {HISTORY  }
            </Typography>
            <Divider variant="middle" />
          </Grid>

          <br />
          {this.state.video.map((item) => {
            return (
            
              <Grid container>
                <Grid item xs={12} sm={12} md={3} lg={3} key={item._id}>
                <Link
                      to={{
                        pathname: "/videos/watch/" + item.videoId._id,
                      }}
                      className={classes.textLink}
                    >
                  <div className={classes.cursor}>
                    <Box className={classes.box}>
                      <img
                        className={classes.image}
                        alt={item.videoId.title}
                        src={item.videoId.thumbnail}
                      />
                    </Box>
                  </div>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  
                  <div className={classes.cursor}>
                    <Box pr={2} className={classes.box1}>
                      <div className={classes.title}>
                        <img
                          className={classes.avatar}
                          alt={item.videoId.title}
                          src={item.videoId.channelId.channelImage}
                        />
                        <Typography gutterBottom variant="body2">
                          {item.videoId.title}
                        </Typography>
                      </div>

                      <div className={classes.description}>
                        <Typography
                          display="block"
                          variant="caption"
                          color="textSecondary"
                        >
                          {item.videoId.channelId.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {`${nFormatter(item.videoId.views)} • ${item.videoId.createdAt}`}
                        </Typography>
                      </div>
                      <div className={classes.iconButton}>
                        <IconButton edge="end" color="inherit">
                          <MoreVertIcon />
                        </IconButton>
                      </div>
                    </Box>
                  </div>
                </Grid>
              </Grid>
              
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(withCookies(PlaylistVideoList)));
