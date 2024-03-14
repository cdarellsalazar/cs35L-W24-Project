import React, { Component } from "react";
import Avatar from "../LeftSidebar/Avatar";
import StartReacting from "../../components/StartReacting";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
    console.log("HEREIAM", this.props)
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
            <span>{this.props.timeSent}</span>
            <span>{this.props.dateSent}</span>
            <StartReacting messageID={this.props.idnotkey} reactions={this.props.reactions}/>
          </div>
        </div>
        <Avatar isOnline={this.props.isOnline} image={this.props.image} />
      </div>
    );
  }
}