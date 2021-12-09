import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  input: {
    margin: theme.spacing(2),
    paddingRight: theme.spacing(5),
  },
  divider: {
    marginRight: theme.spacing(9),
    marginLeft: theme.spacing(9),
  },
});

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      title: "",
      description: "",
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
  }
  handleChange(files) {
    this.setState({
      files: files,
    });
  }
  titleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }
  descriptionChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DropzoneArea
          showPreviews={true}
          clearOnUnmount={true}
          acceptedFiles={["video/*"]}
          filesLimit={1}
          maxFileSize={1073741824}
          showFileNames={true}
          onChange={this.handleChange}
        />
        <br />
        <Divider variant="middle" />
        <TextField
          label="Title"
          className={classes.input}
          fullWidth
          variant="outlined"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.titleChange}
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
          onChange={this.descriptionChange}
          variant="outlined"
          type="text"
          name="description"
        />
        <Divider variant="middle" className={classes.divider} />
      </div>
    );
  }
}

export default withStyles(styles)(Create);
