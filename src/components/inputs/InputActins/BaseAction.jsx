import React, { Component } from "react";

class BaseAction extends Component {
  handleChange = (e) => {
    const { ondblclick } = this.props;
    if (ondblclick) {
      ondblclick(e.target.value);
    }
  };

  render() {
    const { value } = this.props;
    return (
      <div>
        <lable>test</lable>
      </div>
    );
  }
}

export default BaseAction;
