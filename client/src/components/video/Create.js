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
import { videoUpload } from "../../apis/Video";
import { getCategory } from "../../apis/Category";
import Card from '@material-ui/core/Card';
import { Grid } from "@material-ui/core";
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
  card1: {
    display: 'block',
    width: '100%',
    transitionDuration: '0.3s',
    height: '20vw'
  },
  title: {
    fontSize: 20,
    textAlign:"center",
    fontWeight: 'bold',
    position: 'relative',
  },
  root1: {
    flexGrow: 1,
  },
  h3: {
    margin: theme.spacing(2),
    paddingRight: theme.spacing(5),
    textAlign:"center",
  },
});

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      thumbnail: [],
      title: "",
      description: "",
      category: null,
      categoryText: "",
      type: "0",
      categories: [],
    };
    this.clearInput = this.clearInput.bind(this);
  }
  uploadVideo = () => {
    var fd = new FormData();
    fd.append("title", this.state.title);
    fd.append("category", this.state.category);
    fd.append("description", this.state.description);
    fd.append("file", this.state.file);
    fd.append("thumbnail", this.state.thumbnail);
    fd.append("type", this.state.type);
    //console.log(fd);
    videoUpload(fd);
  };

  clearInput = () => {
    this.setState({
      file: [],
      thumbnail: [],
      title: "",
      description: "",
      category: null,
      categoryText: "",
      type: "0",
    });
  };

  componentDidMount() {
    getCategory().then((response) => {
      console.log(response.data[0].name);
      this.setState({ categories: response.data });
      console.log(this.state.categories);
    });
  }
  render() {
    const { classes } = this.props;
    // const top100Films = [
    //   { title: "The Shawshank Redemption", id: "ihjuuyejexst" },
    //   { title: "The Shawshank Redemption", id: "alksiexvtdaq" },
    // ];

    return (
      
      <div className={classes.root}>
       
       
        <Typography className={classes.h3} variant="h3">Upload Video</Typography>
        <Divider variant="middle" />
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
          options={this.state.categories}
          inputValue={this.state.categoryText}
          onInputChange={(e, val) => {
            this.setState({ categoryText: val });
          }}
          value={this.state.category}
          onChange={(e, val) => {
            this.setState({ category: val._id });
          }}
          getOptionLabel={(option) => option.name}
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

        <div className={classes.root1}>
          <Grid container spacing={10}>
            <Grid item xs>   
                <Card className={classes.card1}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Upload Video
                </Typography>
                <hr/>
                  <DropzoneArea
                  showPreviews={true}
                  clearOnUnmount={true}
                  acceptedFiles={["video/*"]}
                  filesLimit={1}
                  maxFileSize={1073741824}
                  showFileNames={true}
                  onChange={(file) => {
                    this.setState({ file: file[0] });
                  }}
                />
                </Card>
                <br/>
            </Grid>
            <Grid item xs>
            <Card className={classes.card1}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Upload thumbnail
                </Typography>
                <hr/>
                <DropzoneArea
                    clearOnUnmount={true}
                    acceptedFiles={["image/*"]}
                    filesLimit={1}
                    showFileNames={true}
                    onChange={(file) => {
                      this.setState({ thumbnail: file[0] });
                    }}
                  />
                </Card>
                <br/>
            </Grid>
          </Grid>
        </div>


        <div className={classes.buttonDiv}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.uploadVideo}
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
