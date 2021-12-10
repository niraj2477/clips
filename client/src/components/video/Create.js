import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
      type: "public",
    };
    this.handleChange = this.handleChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
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
  }
  descriptionChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  categoryChange(e) {
    this.setState({
      ...this.state,
      category: e.target.value,
    });
    console.log(this.state);
  }
  typeChange(e) {
    this.setState({
      
      [e.target.name]: e.currentTarget.value,
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
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            id="demo-simple-select-outlined"
            value={this.state.category}
            onChange={this.categoryChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Divider variant="middle" className={classes.divider} />
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="type"
            value={this.state.type}
            onChange={this.typeChange}
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Create);
