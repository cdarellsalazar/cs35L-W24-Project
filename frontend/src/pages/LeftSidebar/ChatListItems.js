import React, { Component } from "react";
import Avatar from "./Avatar";

export default class ChatListItems extends Component {
  /*constructor(props) {
    super(props);
    this.state = {selected: false};
  }*/
  selectChat = (e) => {
    this.props.onClick();
    console.log(this.props.name);
    //this.setState({selected: true});
  };

  render() {
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={this.selectChat}
        className={`chatlist__item ${this.props.selected ? "active" : ""}`}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "http://placehold.it/80x80"
          }
          isOnline={this.props.isOnline}
        />

        <div className="userMeta">
          <p>{this.props.name}</p>
          <span className="activeTime">{this.props.activeTime}</span>
        </div>
      </div>
    );
  }
}