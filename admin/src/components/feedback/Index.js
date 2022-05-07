import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getFeedback } from "../../apis/Feedback";
import red from "@material-ui/core/colors/red";
import Card from "@material-ui/core/Card";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "@react-spring/web";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
//card

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  root: {
    marginTop: theme.spacing(5),
  },
  h3: {
    margin: theme.spacing(2),
    paddingRight: theme.spacing(5),
    textAlign:"center",
    fontFamily:'"Sacramento", cursive',
  },
  typography: {
    body1: {
      fontWeight: 600, // or 'bold'
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "220px",
    width: "500px",
  },
  input: {
    margin: theme.spacing(2),
    paddingRight: theme.spacing(5),
  },
});
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      feedback:[],
      modelOpen: false,
      name: "",
    };
  }
  componentDidMount() {
    this.loadFeeback();
  }

  loadFeeback = () => {
    getFeedback().then((response) => {
        console.log(response.data)
      this.setState({ feedback: response.data });
    });
  };



  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.h3} variant="h3">Feedback</Typography>
        <Divider variant="middle" />
        <Divider variant="middle" />
        <br/>

        <Card>
          
          <Divider />
          <div className={classes.root}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography> User</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography> Title</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography> Description</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography> Image</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.feedback.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.userId.name}</TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>

                      <TableCell align="left">
                      <img
                              src={row.report}
                              alt="e"
                              style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                              }}
                            />

                      </TableCell>
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
export default withStyles(styles)(Index);
