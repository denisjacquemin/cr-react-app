import React from 'react'
//import Firebase from 'firebase'


var Option = React.createClass({

  render: function() {

    return (
        <div className="item" data-value={this.props.value}>{this.props.label}</div>
    )
  }
})

var DropDown = React.createClass({

  getInitialState() {
      return {
          value: null
      };
  },


  componentWillMount: function() {
    this.fbref = null //new Firebase(this.props.fbroot);

    this.options = [
      <Option value="bim" label="BIM" />,
      <Option value="bam" label="BAM" />
    ]
    // this.fbref.child('seeds').child(this.props.seedsname).on('value', (d) => {
    //   d.forEach((f) => {
    //     thisoptions.push(<div className="item" data-value={f.value}>{f.label}</div>)
    //   })
    // })
  },

  componentDidMount() {
    // $(this.getDOMNode()).find('.ui.dropdown').dropdown({
    //   onChange: (value) => {
    //     if (this.props.data.onChange) {
    //       eval(this.props.data.onChange)
    //     }
    //   }
    // });
  },

  componentDidUpdate() {
    $('ui.selection.dropdown').dropdown('refresh');
  },

  render: function() {

    var optionsUI = React.createElement('div', {"className": "menu"}, this.options)


    return (
      <div>
        <label>{this.props.data.label}</label>
        <div className="ui fluid search selection dropdown">
          <input type="hidden" name="country" />
          <i className="dropdown icon"></i>
          <div className="default text">{this.props.data.placeholder}</div>
          {optionsUI}
        </div>
      </div>
    );
  }
})
export default DropDown;
