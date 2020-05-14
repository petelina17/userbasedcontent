import React from "react";
import "./content.css";
import ForumIcon from "@material-ui/icons/Forum";
import { Button } from "@material-ui/core";

let id = 0;
class Content extends React.Component {
  state = {
    addPost: false,
    text: "",
    title: "",
  };

  deletePost = (e) => {
    // CODE FOR DELETE POST
    console.log(e);
  };
  addPost = () => {
    this.setState({ addPost: true });
  };
  createdPost = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let today = `${year}-${month}-${day}`
    

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    let postDiv = document.createElement("div");
    postDiv.id = `post${id++}`;
    postDiv.className = "post";
    postDiv.innerHTML = `<div class="titleDiv"><h2> ${this.state.title}</h2>
    <button class='click'> X </button>
    </div>
    <div>
    <span> ${this.props.location.state} </span>
    <span> ${year}-${month}-${day}</span>
    </div>
    <p>${this.state.post}</p>
    `;

    let post = {
      title: this.state.title,
      text: this.state.text,
      date: today,
      username: this.props.location.state,
      
    };
    fetch("http://localhost:9000/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(post),
    })
    this.setState({ addPost: false });
    document.getElementById("allContent").appendChild(postDiv);
    this.setState({ post: "" });
    this.setState({ title: "" });
  };
  
  //SAVE POSTS IN DATABASE


  componentDidUpdate() {
    let click = document.querySelector(".click");
    if (click) {
      click.addEventListener("click", this.deletePost);
    }
  }

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
