import React from 'react'
//import Firebase from 'firebase'

var Radio = React.createClass({

  componentDidMount() {

    if (this.props.data.behaviour) {
      $(React.findDOMNode(this)).find('.ui.checkbox').checkbox({
        onChecked: () => {
          eval(this.props.data.behaviour);
        }
      })
    } else {
      $(React.findDOMNode(this)).find('.ui.checkbox').checkbox()
    }
  },

  render: function() {

    return (
      <div className="field">
        <div className="ui radio checkbox">
          <input type="radio"
                 name={this.props.name}
                 checked={this.props.data.checked ? 'checked' : ''}
                 value={this.props.data.value} tabindex="0"
                 className="hidden"
                 onChange={this.props.changeHandler} />
          <label>{this.props.data.label}</label>
        </div>
      </div>
    );
  }
})
export default Radio;
