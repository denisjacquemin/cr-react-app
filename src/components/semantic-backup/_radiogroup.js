import React from 'react'
import Radio from './radio'

var RadioGroup = React.createClass({

  render: function() {
    var radios = [];
    if (this.props.data.radios) {
      for (var i in this.props.data.radios) {
        radios.push(<Radio name={this.props.data.name} data={this.props.data.radios[i]} />)
      }
    }
    var radiosUI = React.createElement('div', {}, radios);

    return (
      <div className="grouped fields">
        <label for="fruit">{this.props.data.label}</label>
        { radiosUI }
      </div>
    );
  }
})
export default RadioGroup;
