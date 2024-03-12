import React, { Component } from "react";
import Avatar from "../LeftSidebar/Avatar";
import StartReacting from "../../components/StartReacting";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log('ChatItem props:', this.props)
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
            <span>{this.props.timeSent}</span>
            <span>Seen 1.03PM</span>
            <StartReacting />

          </div>
        </div>
        <Avatar isOnline={this.props.isOnline} image={this.props.image} />
      </div>
    );
  }
}