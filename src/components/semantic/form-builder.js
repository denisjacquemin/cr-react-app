import React from 'react'
import Field from './field'
import Segment from './segment'

//import Firebase from 'firebase'

var FormBuilder = React.createClass({

  handleChange: function(datakey, value) {
    this.props.changeHandler(datakey, value);
  },

  render: function() {

    var fieldsSet = []
    if(this.props.form) {
      this.props.form.fieldset.forEach((fs) => {
        var fields = []
        fs.fields.forEach((f) => {
          var rowfields = []
          for (var k in f) {
            rowfields.push(<Field fieldtype={f[k].type}
                                  data={f[k]}
                                  datakey={k}
                                  changeHandler={this.handleChange}
                                  fbroot={this.props.fbroot} /> )
          }
          fields.push(React.createElement('div', {className: 'fields'}, rowfields));
        })

        fieldsSet.push(<Segment data={fs} content={fields} />)
      });
    }

    this.ui = React.createElement('div', {}, fieldsSet);
    return (
      <form className="ui form">
        {this.ui}
      </form>
    );
  }
})
export default FormBuilder;
