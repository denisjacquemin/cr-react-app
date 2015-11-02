import React from 'react'
//import Firebase from 'firebase'

var Segment = React.createClass({

  render: function() {

    var labelUI
    if (this.props.data.label) {
      labelUI = React.createElement('div', {className: 'ui top attached label'}, this.props.data.label)
    }

    return (
      <div className="ui segment" id={this.props.data.id} style={{display: this.props.data.display ? this.props.data.display : ''}}>
        {labelUI}
        {this.props.content}
      </div>
    );
  }
})
export default Segment;
