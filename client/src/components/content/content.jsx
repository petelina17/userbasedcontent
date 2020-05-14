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

  componentDidMount() {
    console.log(this.props.location.state);
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
        console.log("get response: ", res);
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
          item.addEventListener("click", this.editPost);
        });
      });
  }
  editPost = (e) => {
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
    //   fetch("http://localhost:9000/content", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .catch((err) => {
    //       console.log("[ERROR]", err);
    //     })
    //     .then((res) => {
    //       console.log("delete response: ", res);
    //     });
    //   console.log(e);
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
    //   fetch("http://localhost:9000/content", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .catch((err) => {
    //       console.log("[ERROR]", err);
    //     })
    //     .then((res) => {
    //       console.log("delete response: ", res);
    //     });
    //   console.log(e);
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
        }
        console.log("createPost is not True");
      });

    this.setState({ addPost: false });
    document.getElementById("allContent").appendChild(postDiv);
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
          <Button
            variant="contained"
            onClick={() => {
              this.setState({ addPost: true });
            }}
          >
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
                value={this.state.text}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
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
