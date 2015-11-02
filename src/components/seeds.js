import React from 'react'
import Firebase from 'firebase'
import FormBuilder from './semantic/form-builder'

var Grid = require('react-semantify').Grid;
var Column = require('react-semantify').Column;
var Form = require('react-semantify').Form;
var Fields = require('react-semantify').Fields;
var Field = require('react-semantify').Field;
var Label = require('react-semantify').Label;
var Input = require('react-semantify').Input;
var Button = require('react-semantify').Button;





var Seeds = React.createClass({
  getInitialState: function() {
      return {
        form: null
      }
  },

  handleChange: function(e) {
    console.log('value: ' + JSON.parse(e.target.value));
    this.setState({form: JSON.parse(e.target.value)})
  },

  componentWillMount: function() {
    this.fbref = new Firebase(this.props.fbroot);
  },

  componentDidMount() {
  },

  _getDataTree: function (e) {
    this.fbref.child($(React.findDOMNode(this)).find('.path input').val()).once('value', (d) => {
      this.setState({
        "rawjson":  d.val(),
        "prettyjson": JSON.stringify(d.val(),undefined, 4)
      })
    })
  },

  _saveDataTree: function (e) {
    this.fbref.child($(React.findDOMNode(this)).find('.path input').val()).set(JSON.parse(React.findDOMNode(this.refs.dataTree).value))
  },

  _onDataTreeChange: function (e) {
    this.setState({
      "rawjson":  JSON.parse(e.target.value),
      "prettyjson": JSON.stringify(JSON.parse(e.target.value),undefined, 4)

    })
  },

  render: function() {
//<FormBuilder className="ui form" form={this.state.rawjson} />
    return (

      <Grid>
        <Column className="eight wide">
          <Form>
            <Field>
              <label>Path</label>
              <Input placeholder="Path" type="text" className="path"/>
              <Button onClick={ this._getDataTree }>Get</Button>
            </Field>
            <Field>
              <label>The Data</label>
              <textarea name="value" rows="35" ref="dataTree" value={this.state.prettyjson} onChange={this._onDataTreeChange}/>
            </Field>
            <Field><Button onClick={ this._saveDataTree }>Save</Button></Field>
          </Form>
        </Column>
        <Column className="eight wide">
          <Form>
            <Field>
              <label>Preview</label>

            </Field>
          </Form>
        </Column>
      </Grid>
      // <div className="ui grid">
      //   <div className="ui column eight wide">
      //     <form className="ui form">
      //       <div class="field">
      //         <label>Path</label>
      //         <input type="text" name="path" className="path" />
      //         <button className="ui button get" type="button">Get</button> <button className="ui button save" type="button">Save</button>
      //       </div>
      //       <div class="field">
      //         <label>Value</label>
      //         <textarea name="value" rows="35" value={this.state.json} onChange={this.handleChange.bind(this)}/>
      //       </div>
      //     </form>
      //   </div>
      //   <div className="ui column eight wide">
      //
      //     <Form className="ui form" form={this.state.form} />
      //   </div>
      // </div>
    );
  }
})
export default Seeds;
