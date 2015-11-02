import React from 'react'
//import Firebase from 'firebase'

var Button = React.createClass({

  render: function() {

    var className = 'ui button'
    if (this.props.class) {
      className = className + ' ' + this.props.class
    }

    return (
      <button className={className}>
        {this.props.label}
      </button>
    );
  }
})
export default Button;
