import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getCategory, deleteCategory, addCategory } from "../../apis/Category";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
      modelOpen: false,
      name: "",
    };
  }
  componentDidMount() {
    this.loadcategory();
  }
  loadcategory = () => {
    getCategory().then((response) => {
      this.setState({ category: response.data });
    });
  };
  handleOpen = () => {
    this.setState({ modelOpen: true });
  };

  handleClose = () => {
    this.setState({ modelOpen: false });
  };
  createCategory = () => {
    addCategory(this.state.name).then((response) => {
      this.handleClose();
      this.loadcategory();
    });
  };
  categoryDelete = (id) => {
    deleteCategory(id)
      .then((response) => {
        this.loadcategory();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={this.state.modelOpen}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modelOpen}>
            <div className={classes.paper}>
              <Typography variant="h5"> New Category</Typography>
              <TextField
                label="Category"
                className={classes.input}
                fullWidth
                variant="outlined"
                type="text"
                name="category"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
                required={true}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                style={{ float: "right" }}
                onClick={this.createCategory}
              >
                ADD
              </Button>
            </div>
          </Fade>
        </Modal>
        <Card>
          <Divider />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<AddIcon />}
            style={{ float: "right" }}
            onClick={this.handleOpen}
          >
            Category
          </Button>
          <Divider />
          <div className={classes.root}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography> Category Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.category.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {/* <IconButton edge="end" style={{ color: amber[600] }}>
                          <EditIcon />
                        </IconButton> */}
                        <IconButton
                          edge="end"
                          style={{ color: red[800] }}
                          onClick={() => {
                            this.categoryDelete(row._id);
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
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
