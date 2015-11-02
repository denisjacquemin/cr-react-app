import React from 'react'
import Popup from './popup'

//import Firebase from 'firebase'

var FieldText = React.createClass({

  handleChange: function (e) {
    console.log('handleChange');
    if (this.props.data.onChange) {
      eval(this.props.data.onChange)
    }
  },

  render: function() {

    var helpUI
    if (this.props.data.help) {
      helpUI = <Popup message={this.props.data.help} />
    }

    return (
      <div id={this.props.data.id} style={{display: this.props.data.display ? this.props.data.display : ''}}>
        <label>{this.props.data.label} {helpUI}</label>
        <input type="text" name={this.props.data.name} placeholder={this.props.data.placeholder} onChange={this.handleChange} />
      </div>
    );
  }
})
export default FieldText;
