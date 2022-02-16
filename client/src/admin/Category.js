import React, { Component } from "react";
import { getCategory ,deleteCategory} from "../apis/Category";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/styles";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const styles = (theme) => ({
    root: {
      padding: theme.spacing(3),
    },
    input: {
      margin: theme.spacing(2),
      paddingRight: theme.spacing(5),
    },
    buttonDiv: {
      display: "flex",
      justifyContent: "center",
    },
    button: {
      margin: theme.spacing(2),
  
      paddingRight: theme.spacing(5),
    },
    divider: {
      marginRight: theme.spacing(9),
      marginLeft: theme.spacing(9),
    },
    table: {
        minWidth: 650,
      },
  });
 class  Category extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
        this.handleDelete =this.handleDelete.bind(this);
      }
      getCategories =  () =>{
        getCategory().then((response) => {
          console.log(response.data[0].name);
          this.setState({ categories: response.data });
          console.log(this.state.categories);
        });
      }
      componentDidMount() {
        this.getCategories()
      }
     
      handleDelete = (id) =>{
        deleteCategory(id).then((response)=>{console.log(response)})
          this.getCategories()
      };
      render() {
        const { classes } = this.props;
        return (
          <div>
              
              <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell >Name</TableCell>
            
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.categories.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell component="th" scope="row">
                  <IconButton  onClick={() => this.handleDelete(row._id)}>
                  <DeleteForeverIcon/>
                  </IconButton>
              
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
        );
      }
}
export default withStyles(styles)(Category);