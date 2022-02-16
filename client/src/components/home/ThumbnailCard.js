import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { indexPage } from "../../apis/video";
import { Link } from "react-router-dom";

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
    };
  }
  componentDidMount() {
    indexPage(this.state.v).then((response) => {
      console.log(response.data)
      if(response.data.length > 0){
        this.setState({ video: response.data });
        
          this.setState({ v: this.state.video[0]._id });
        
        
  
      }
          });
  }

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
                  <Link
                    to={{
                      pathname: "/videos/watch/" + item._id,
                   
                    }}
                    className={classes.textLink}
                  >
                    <Box className={classes.box} id={item._id}>
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
                  </Link>
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
