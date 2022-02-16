import React, { Component } from "react";
import { watch, fetchVideo } from "../../apis/video";
import ReactPlayer from 'react-player'
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
    return (
      <div>

<ReactPlayer url={this.state.video.file}  pip muted={true}
        controls />
      </div>
    );
  }
}

export default Watch;
