import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { getChannel } from "../../apis/Channel";
const styles = (theme) => ({
  root: {
    width: "100%",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  channelImage: {
    marginLeft: theme.spacing(8),
  },
  channelName: {
    marginLeft: theme.spacing(24),
    marginTop: theme.spacing(-9),
  },
  suscriber: {
    marginLeft: theme.spacing(26),
    marginTop: theme.spacing(-0.2),
  },
  suscriberButton: {
    float: "right",
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(-6),
  },
  header: {},
  main: {},
});
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
class Creator extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      value: 0,
      id: cookies.get("id") || null,
      channel: [],
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  getDetail = () => {
    getChannel(this.state.id).then((data) => {
      this.setState({ channel: data.data });
    });
    console.log(this.state.channel);
  };
  componentDidMount() {
    this.getDetail();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.channelImage}>
            <Avatar alt="Remy Sharp" className={classes.large} />
          </div>
          <div className={classes.channelName}>
            <Typography variant="h5" color="textSecondary"></Typography>
          </div>
          <div className={classes.suscriber}>
            <Typography variant="subtitle1" color="textSecondary">
              19.9k suscriber
            </Typography>
          </div>
          <div className={classes.suscriberButton}>
            <Button variant="contained" color="primary">
              Suscribe
            </Button>
          </div>
        </div>
        <br />
        <Divider />
        <div className={classes.main}>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="text"
            centered
            onChange={this.handleChange}
            aria-label="tabs"
          >
            <Tab label="ABOUT" />
            <Tab label="VIDEOS" />
            <Tab label="PLAYLIST" />
          </Tabs>
          <TabPanel value={this.value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={this.value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={this.value} index={2}>
            Item Three
          </TabPanel>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(withCookies(Creator));
