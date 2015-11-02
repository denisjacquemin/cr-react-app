import React from 'react'
var Dropdown = require('react-semantify').Dropdown;
var Checkbox = require('react-semantify').Checkbox;
var Item = require('react-semantify').Item;
var Menu = require('react-semantify').Menu;
var Input = require('react-semantify').Input

import TextArea from './textarea'
import Popup from './popup'

var Field = React.createClass({

  getInitialState: function() {
    return {
      items: []
    }
  },

  _onValueChange: function(e) {
    this.props.changeHandler(e.target.name, e.target.value);
  },

  _onChange: function(datakey, value) {
    this.props.changeHandler(datakey, value);
  },


  componentWillMount: function() {
    this.fbref = new Firebase(this.props.fbroot)
    if (this.props.data.seedsname !== undefined) {
      // this.items = [
      //   <Item data-value="one">One</Item>,
      //   <Item data-value="two">Two</Item>
      // ]
      var items = []
      var seed_path = this.props.data.seedsname
      this.fbref.child('seeds').child(seed_path).on('value', (d) => {
        console.log('seed_path: ' + seed_path + JSON.stringify(d.val()));
        d.val().forEach((i) => {

          items.push(i)
        })
        this.setState({items: items})
      })

    }
  },

  render: function() {

    //console.log('render ' + this.props.data.label);
    var ui;

    switch (this.props.fieldtype) {
      case 'text':
        var helpUI
        if (this.props.data.help) {
          helpUI = <Popup message={this.props.data.help} />
        }

        ui = [
          <label>{this.props.data.label} {helpUI}</label>,
          <Input className={this.props.data.className}
                 error={this.props.data.error}
                 placeholder={this.props.data.placeholder}
                 onChange={this._onValueChange}
                 name={this.props.datakey}
                 type="text"
                 value={this.props.data.value}></Input>
        ]
        break
      case 'dropdown':
        var ItemsUI = []
        this.state.items.forEach( (i) => {
          //console.log("i: " + JSON.stringify(i));
          ItemsUI.push(<Item data-value={i.value}>{i.label}</Item>)
        })
        var MenuUI = React.createElement('div', {"className": "menu"}, ItemsUI)
        ui = [
          <label>{this.props.data.label}</label>,
          <Dropdown className={this.props.data.className} init={{
                      onChange: eval(this.props.data.onChange)
                    }}>
            <input type="hidden" name={this.props.data.name} />
            <i className="dropdown icon"></i>
            <div className="default text">{this.props.data.default}</div>
            {MenuUI}
          </Dropdown>
        ]
        break
      case 'radiogroup':
        console.log('In radiogroup')
        ui = [
          <div className="grouped fields">
            {
              this.props.data.radios.map((r) => {
                return (
                  <div className="field">
                    <Checkbox className="radio"
                      init={{
                        onChange: () => {this._onChange(r.name, r.value)},
                        onChecked: r.onChecked,
                        uncheckable: false
                      }}>
                      <input type={r.type}
                             className="hidden"
                             name={r.name}
                             value={r.value}
                             checked={r.checked ? 'checked' : ''} />
                      <label>{r.label}</label>
                    </Checkbox>
                  </div>
                )
              })
            }
          </div>
        ]
        break
      // case 'radio':
      //   ui = [
      //     <Checkbox className="radio"
      //       init={{
      //         onChange: eval(this.props.data.onChange),
      //         uncheckable: false
      //       }}>
      //       <input type="checkbox" className="hidden" />
      //       <label>{this.props.data.label}</label>
      //     </Checkbox>
      //   ]
      //   break
      // case 'radio':
      //   ui = <RadioGroup data={this.props.data} changeHandler={this.handleChange} datakey={this.props.datakey} />
      //   break
      case 'textarea':
        ui = <TextArea data={this.props.data} changeHandler={this._onChange} datakey={this.props.datakey} />
    }

    var className = 'field';
    if (this.props.data.wide) {
      className = className + ' wide ' + this.props.data.wide;
    }

    return (
      <div className={className}>
        {ui}
      </div>
    );
  }
})
export default Field;
