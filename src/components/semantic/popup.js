import React from 'react'
//import Firebase from 'firebase'

var Popup = React.createClass({

  componentDidMount() {
    $(React.findDOMNode(this)).popup()
  },

  render: function() {

    return (
        <i className="help icon label" data-content={this.props.message} />
    );
  }
})
export default Popup;
