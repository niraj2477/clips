import React, { Component } from "react";
import { watch, fetchVideo } from "../../apis/video";
export class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      comments: [],
    };
  }
  componentDidMount() {
    const currentURL = window.location.href;
    const myArray = currentURL.split("/");
    watch(myArray[5]).then((response) => {
      this.setState({ video: response.data });
      console.log(this.state.video.file);
      fetchVideo(this.state.video.file).then((response) => {
        console.log("success");
      });
    });
  }
  render() {
    return <div>{this.props.v}</div>;
  }
}

export default Watch;
