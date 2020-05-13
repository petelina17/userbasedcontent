import React from "react";
import "./content.css";
import ForumIcon from "@material-ui/icons/Forum";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "@material-ui/core";

class Content extends React.Component {
  state = {
    addPost: false,
    post: "",
    title: "",
  };
  addPost = () => {
    this.setState({ addPost: true });
  };
  createdPost = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) day = 0 + day;
    if (month < 10) month = Number(0 + month);

    let post = document.createElement("div");
    post.id = "post";
    post.innerHTML = `<h2> ${this.state.title}</h2>
    <div>
    <span> INSERT USER </span>
    <span> ${year}-${month}-${day}</span>
    </div>
    <p>${this.state.post}</p>
    `;

    this.setState({ addPost: false });
    document.getElementById("allContent").appendChild(post);
    this.setState({ post: "" });
    this.setState({ title: "" });
  };

  logOut = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div id="content-div">
        <div>
          <header id="header">
            <ForumIcon style={{ fontSize: "50" }} />
          </header>
          <main id="allContent"></main>
        </div>
        <div className="buttondiv">
          <Button variant="contained" onClick={this.addPost}>
            Add post
          </Button>
          <Button variant="contained" onClick={this.logOut}>
            {" "}
            Log out
          </Button>
        </div>
        {this.state.addPost === true ? (
          <React.Fragment>
            <div className="createPost-div">
              <h1>Title</h1>
              <input
                value={this.state.title}
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }
                type="text"
                placeholder="Enter title here..."
              />
              <h1>Post</h1>
              <textarea
                value={this.state.post}
                onChange={(event) =>
                  this.setState({ post: event.target.value })
                }
                rows="6"
                column="150"
                placeholder="Enter post here..."
              ></textarea>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.createdPost}
              >
                {" "}
                Create Post{" "}
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}
export default Content;
