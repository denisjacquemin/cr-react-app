import React from 'react';
import AuthBox from './auth-box';

var MenuTop  = React.createClass({

  handleUID: function(uid, name, URLid) {
    this.props.uidHandler(uid, name, URLid);
  },

  render: function() {
    return (
      <ul>
        <li class="link">À propos</li>
        <li><AuthBox fbroot={this.props.fbroot} uidHandler={this.handleUID} loggedUser={this.props.loggedUser} /></li>
        <li class="button">Publiez votre annonce</li>
      </ul>
    );
  }
});
export default MenuTop;
