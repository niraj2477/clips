import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import ClearIcon from "@material-ui/icons/Clear";
import ReportIcon from '@material-ui/icons/Report';
import Link from '@material-ui/core/Link';
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
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: [],
      title: "",
      description: "",
    };
    this.clearInput = this.clearInput.bind(this);
  }
  clearInput = () => {
    this.setState({
      report: [],
      title: "",
      description: "",
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography style={{color:"gray"}} >
         <center> Have feedback? We'd love to hear it, but
          please don't share sensitive information. Have
          questions? Try help or support.</center>
        </Typography>
        <TextField
          label="Title"
          className={classes.input}
          fullWidth
          variant="outlined"
          type="text"
          name="title"
          value={this.state.title}
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
          required={true}
        />
        <Divider variant="middle" className={classes.divider} />
        <TextField
          label="Description"
          multiline
          maxRows={10}
          value={this.state.description}
          className={classes.input}
          fullWidth
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
          variant="outlined"
          type="text"
          name="description"
        />

        <Divider variant="middle" className={classes.divider} />
        <br/>
        <DropzoneArea
          clearOnUnmount={true}
          acceptedFiles={["image/*"]}
          filesLimit={1}
          showFileNames={true}
          onChange={(file) => {
            this.setState({ report: file[0] });
          }}
        />
       
        <div className={classes.buttonDiv}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.uploadVideo}
            className={classes.button}
            startIcon={<ReportIcon />}
          >
            Report
          </Button>
          <Button
            variant="contained"
            color="text"
            size="large"
            className={classes.button}
            onClick={this.clearInput}
            startIcon={<ClearIcon />}
          >
            Cancel
          </Button>
        </div>
        <Typography style={{color:"gray"}} >
          Some <Link href="#"> account and system</Link> information may be sent to 
          Clips. We will use it to fix problems and improve our 
          services, subject to our <Link href="#">privacy policy</Link> and<Link href="#"> Terms of Service</Link>. 
          We may email you for more information or updates. Go to 
          Legal help to ask for content changes for legal reasons.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Index);