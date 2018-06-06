import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import ImageFilter from "react-image-filter";
// var base64Img = require("base64-img");
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  v;

  handleSubmit(event, ftStr) {
    alert("Your favorite flavor is: " + this.state.value);

    event.preventDefault();
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading", this.state.file);
    const fd = new FormData();
    fd.append("image", this.state.file, this.state.file.name);
    console.log(fd);
    axios
      .post("my-domain.com.file-upload", fd, {
        onUploadProgress: progressEvent => {
          console.log(
            "Upload Progress:" +
              (progressEvent.loaded / progressEvent.total) * 100 +
              "%"
          );
        }
      })
      .then(res => {
        console.log(res);
      });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file.name,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }
  _handlePng(e) {
    e.preventDefault();

    axios
      .post("/img", {
        url: this.state.imagePreviewUrl,
        file: this.state.file
      })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    return (
      <div className="previewComponent">
        <h1 className="h11"> Online Image Filter</h1>
        <form onSubmit={e => this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
        </form>

        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite filter:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="invert">invert</option>
              <option value="grayscale">grayscale</option>
              <option value="duotone">duotone</option>
              <option value="sepia">sepia</option>
            </select>
          </label>
        </form>
        <button
          className="pngButton"
          type="submit"
          onClick={e => this._handlePng(e)}
        >
          upload your image to server
        </button>

        <ImageFilter
          className="imgPreview"
          image={imagePreviewUrl}
          filter={this.state.value} // see docs beneath
          colorOne={[100, 150, 250]}
          colorTwo={[250, 150, 130]}
        />
      </div>
    );
  }
}

//ReactDOM.render(<ImageUpload />, document.getElementById("mainApp"));

export default ImageUpload;
