import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {  PLAYLIST } from "../../helpers/constants";
import Divider from "@material-ui/core/Divider";
import { trending } from "../../apis/Video";
import { getHistory } from "../../apis/History";
import { withCookies, Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Card from "@material-ui/core/Card";
import { fetchPlaylist } from "../../apis/UserPlaylist";
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
class PlaylistVideo extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
      };
  constructor(props) {
    super(props);
    
    const { cookies } = props;
    this.state = {
      video: [],
      history:[],
      playlist:[],
      v: null,
      id:cookies.get("id") || null,
    };
  }
  getTreding = () => {
    trending().then((response) => {
      this.setState({ video: response.data });
    });
  };
  fetch = () => {
    fetchPlaylist(this.state.id)
    .then(result => {
      this.setState({ playlist: result.data });
    })
  };
  getHistory= () =>{
   
        getHistory(this.state.id).then((response)=>{
            console.log(response.data)
            this.setState({ video: response.data });
        });
   
  };
  componentDidMount() {
    // this.getTreding();
    this.fetch();
    this.getHistory();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
         <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="overline"
              className={classes.typography}
              color="textSecondary"
            >
              {PLAYLIST}
            </Typography>
            <Divider variant="middle" />
          </Grid>
           <Card>
        
          <Divider />
          <div className={classes.root}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography> Playlist</Typography>
                    </TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.playlist.map((row) => (
                    
                    <TableRow key={row.name}>
                     
                      <TableCell align="left"> <Link
                     to={{
                       pathname: "/videos/playList/" + row._id,
                     }}
                     className={classes.textLink}
                   >{row.name} </Link></TableCell>
                  
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Card>

      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(withCookies(PlaylistVideo)));
