import React from "react";
import "./content.css";
import ForumIcon from "@material-ui/icons/Forum";
import { Button } from "@material-ui/core";

let id = 0;
let postID;
class Content extends React.Component {
  state = {
    addPost: false,
    edit: false,
    text: "",
    title: "",
  };

  componentDidMount() {
    fetch("http://localhost:9000/content", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("[ERROR]", err);
      })
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (this.props.location.state === res[i].username) {
            let postDiv = document.createElement("div");
            postDiv.id = `post${id++}`;
            postDiv.className = "post";
            postDiv.innerHTML = `<div class="titleDiv"><h2> ${res[i].title}</h2>
                              <div class='delete-edit-div'>
                              <button class='delete'> X </button>
                              <button class='edit'> EDIT </button>
                              </div>
                              </div>
                              <div>
                              <span> ${res[i].username} </span>
                              <span> ${res[i].date}</span>
                              </div>
                              <p>${res[i].text}</p>
                              `;
            document.getElementById("allContent").appendChild(postDiv);
          } else {
            let postDiv = document.createElement("div");
            postDiv.id = `post${id++}`;
            postDiv.className = "post";
            postDiv.innerHTML = `<div class="titleDiv"><h2> ${res[i].title}</h2>
                              </div>
                              <div>
                              <span> ${res[i].username} </span>
                              <span> ${res[i].date}</span>
                              </div>
                              <p>${res[i].text}</p>
                              `;
            document.getElementById("allContent").appendChild(postDiv);
          }
        }
        document.querySelectorAll(".delete").forEach((item) => {
          item.addEventListener("click", this.deletePost);
        });
        document.querySelectorAll(".edit").forEach((item) => {
          item.addEventListener("click", this.checkWhichEditWasPushed);
        });
      });
  }

  checkWhichEditWasPushed = (e) => {
    let postDiv = e.toElement.parentElement.parentElement.parentElement;
    let title = e.toElement.parentElement.parentElement.firstChild.innerText;
    let username =
      e.toElement.parentElement.parentElement.nextSibling.nextSibling
        .children[0].innerText;
    let date =
      e.toElement.parentElement.parentElement.nextSibling.nextSibling
        .children[1].innerText;
    let post =
      e.toElement.parentElement.parentElement.nextSibling.nextSibling
        .nextSibling.nextSibling.innerText;
    // console.log(title, date, username, post);
    fetch("http://localhost:9000/content", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("[ERROR]", err);
      })
      .then((res) => {
        // console.log(res);
        // console.log(res[0].title, res[0].date, res[0].username, res[0].text);
        res.forEach((item) => {
          if (
            title === item.title &&
            username === item.username &&
            date === item.date &&
            post === item.text
          ) {
            postID = item._id;
            this.props.history.push(`/content/${item._id}`);
            e.preventDefault();
            return;
          }
        });
        this.setState({ addPost: true });
        this.setState({ edit: true });
      });
  };
  editPost = (e) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let today = `${year}-${month}-${day}`;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let editedPost = {
      title: this.state.title,
      username: this.props.location.state,
      text: this.state.text,
      date: today,
    };
    fetch(`http://localhost:9000/content/:${postID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(editedPost),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("[ERROR]", err);
      })
      .then((res) => {
        this.props.history.push("/content");
        console.log("edit response: ", res);
      });
    this.setState({ addPost: false });
    this.setState({ edit: false });
    this.setState({ title: "" });
    this.setState({ text: "" });
  };
  deletePost = (e) => {
    let postDiv = e.toElement.parentElement.parentElement.parentElement;
    let title = e.toElement.parentElement.parentElement.firstChild.innerText;
    let username =
      e.toElement.parentElement.parentElement.nextSibling.nextSibling
        .children[0].innerText;
    let date =
      e.toElement.parentElement.parentElement.nextSibling.nextSibling
        .children[1].innerText;
    let post =
      e.toElement.parentElement.parentElement.nextSibling.nextSibling
        .nextSibling.nextSibling.innerText;
    console.log(post);
    fetch("http://localhost:9000/content", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("[ERROR]", err);
      })
      .then((res) => {
        console.log("delete response: ", res);
      });
    console.log(e);
  };

  createdPost = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let today = `${year}-${month}-${day}`;

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    let postDiv = document.createElement("div");
    postDiv.id = `post${id++}`;
    postDiv.className = "post";
    postDiv.innerHTML = `<div class="titleDiv"><h2> ${this.state.title}</h2>
    <div class='delete-edit-div'>
    <button class='delete'> X </button>
    <button class='edit'> EDIT </button>
    </div>
    </div>
    <div>
    <span> ${this.props.location.state} </span>
    <span> ${year}-${month}-${day}</span>
    </div>
    <p>${this.state.text}</p>
    `;

    let post = {
      title: this.state.title,
      username: this.props.location.state,
      text: this.state.text,
      date: today,
    };

    fetch("http://localhost:9000/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("[ERROR]", err);
      })
      .then((res) => {
        console.log("login response: ", res);
        if (res.createPost === true) {
          console.log("createPost is true");
          this.setState({ addPost: false });
          document.getElementById("allContent").appendChild(postDiv);
          this.setState({ post: "" });
          this.setState({ title: "" });
        }
        console.log("createPost is not True");
      });
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
          <Button
            variant="contained"
            onClick={() => {
              this.setState({ addPost: true });
            }}
          >
            Add post
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
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
                value={this.state.text}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
                }
                rows="6"
                column="150"
                placeholder="Enter post here..."
              ></textarea>
              {this.state.edit === false ? (
                <React.Fragment>
                
               
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.createdPost}
                >
                  Create Post
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {this.setState({addPost:false})}}
                >
                  Cancel Post
                </Button>
                  </React.Fragment>
              ) : (
                <React.Fragment>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.editPost}
                  >
                  Edit Post
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {this.setState({addPost:false})}}
                  >
                  Cancel Post
                </Button>
                  </React.Fragment>
              )}
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
