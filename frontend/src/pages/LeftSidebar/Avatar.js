import React, { Component } from "react";

export default class Avatar extends Component {
  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={this.props.image} alt="#" />
        </div>
        <span className={`isOnline ${this.props.isOnline ? 'online' : 'offline'}`}></span>
      </div>
    );
  }
}