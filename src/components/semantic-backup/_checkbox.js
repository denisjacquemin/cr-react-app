import React from 'react'
//import Firebase from 'firebase'

var CheckBox = React.createClass({


  componentDidMount() {

    if (this.props.data.behaviour) {
      $(React.findDOMNode(this)).checkbox({
        onChange: () => {
          eval(this.props.data.behaviour)
        }
      })
    } else {
      $(React.findDOMNode(this)).checkbox()
    }
  },

  render: function() {
    return (
      <div id={this.props.data.id} className="ui checkbox">
        <input type="checkbox" className="hidden" onChange={this.props.changeHandler} />
        <label>{this.props.data.label}</label>
      </div>
    );
  }
})
export default CheckBox;
