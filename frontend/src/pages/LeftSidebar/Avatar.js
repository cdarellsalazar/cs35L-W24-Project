import React, { Component } from "react";
import ProfilePicture from "../../components/ProfilePicture.js";
export default class Avatar extends Component {
  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <ProfilePicture className='corner-pic' username={this.props.name} imageUrl={this.props.image} />
        </div>
        <span className={`isOnline ${this.props.isOnline ? 'online' : 'offline'}`}></span>
      </div>
    );
  }
}