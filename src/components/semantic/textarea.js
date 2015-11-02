import React from 'react'
import Popup from './popup'
//import Firebase from 'firebase'

var TextArea = React.createClass({

  handleChange: function (datakey, e) {
    this.props.changeHandler(datakey, e.target.value)
  },

  render: function() {
    var helpUI
    if (this.props.data.help) {
      helpUI = <Popup message={this.props.data.help} />
    }

    return (
      <div id={this.props.data.id} style={{display: this.props.data.display ? this.props.data.display : ''}}>
        <label>{this.props.data.label} {helpUI}</label>
        <textarea name={this.props.data.name}
                  onChange={this.handleChange.bind(this, this.props.datakey)}
                  placeholder={this.props.data.placeholder} />
      </div>
    );
  }
})
export default TextArea;
