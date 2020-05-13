import React from "react";

const defaultValue = {
  userCreated: false,
};

const UserContext = React.createContext(defaultValue);

class UserProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      userCreated: false,
    };
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.UserConsumer;
export { UserConsumer, UserProvider };
