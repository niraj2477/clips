import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import ClearIcon from "@material-ui/icons/Clear";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      title: "",
      description: "",
      category: null,
      categoryText: "",
      type: "0",
    };
    this.clearInput = this.clearInput.bind(this);
  }
  clearInput = () => {
    this.setState({
      file: [],
      title: "",
      description: "",
      category: null,
      categoryText: "",
      type: "0",
    });
  };
  render() {
    const { classes } = this.props;
    const top100Films = [
      { title: "The Shawshank Redemption", id: 1994 },
      { title: "The Shawshank Redemption", id: 1995 },
    ];
    return (
      <div className={classes.root}>
        <DropzoneArea
          showPreviews={true}
          clearOnUnmount={true}
          acceptedFiles={["video/*"]}
          filesLimit={1}
          maxFileSize={1073741824}
          showFileNames={true}
          onChange={(file) => {
            this.setState({ file: file });
          }}
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
        <Autocomplete
          id="combo-box-demo"
          fullWidth
          className={classes.input}
          options={top100Films}
          inputValue={this.state.categoryText}
          onInputChange={(e, val) => {
            this.setState({ categoryText: val });
          }}
          value={this.state.category}
          onChange={(e, val) => {
            this.setState({ category: val });
          }}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Category"
              variant="outlined"
            />
          )}
        />

        <Divider variant="middle" className={classes.divider} />
        <FormControl component="fieldset" className={classes.input}>
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            name="type"
            value={this.state.type}
            onChange={(e) => {
              this.setState({ type: e.target.value });
            }}
          >
            <FormControlLabel value="0" control={<Radio />} label="Public" />
            <FormControlLabel value="1" control={<Radio />} label="Private" />
          </RadioGroup>
        </FormControl>
        <Divider variant="middle" className={classes.divider} />
        <div className={classes.buttonDiv}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload
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
      </div>
    );
  }
}

export default withStyles(styles)(Create);
