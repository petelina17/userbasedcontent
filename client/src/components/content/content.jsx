import React from "react";
import "./content.css";
import ForumIcon from "@material-ui/icons/Forum";

class Content extends React.Component {
  state = {};
  render() {
    return (
      <div className="content-div">
        <header id="header">
          <ForumIcon style={{ fontSize: "50" }} />
        </header>
        <main>WELCOME TO CONTENT</main>
      </div>
    );
  }
}

export default Content;
