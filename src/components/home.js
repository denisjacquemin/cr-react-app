import React from 'react'
import Firebase from 'firebase'
import Table from './semantic/table'
import ModalNewForm from './semantic/modal-new-form'
import FormBuilder from './semantic/form-builder'
var Button = require('react-semantify').Button;
var Field = require('react-semantify').Field;
var Dropdown = require('react-semantify').Dropdown;
var Item = require('react-semantify').Item;
var Grid = require('react-semantify').Grid;
var Column = require('react-semantify').Column;
var Row = require('react-semantify').Row;
var Input = require('react-semantify').Input;



var Home = React.createClass({

  getInitialState: function() {
      return {
        formnames: [],
        forms: []
    };
  },

  componentWillMount: function() {
    this.fbref = new Firebase(this.props.fbroot);
    this.fbref.child('seeds').child('formnames').on('value', (d) => {
      // d.val().forEach((i) => {
      //
      //   items.push(i)
      // })
      this.setState({"formnames": d.val()})
    })

    this.fbref.child('courties').child('acp').on('value', (d) => {
      this.setState({"forms": d.val()})
    })

  },

  _onClickNewForm: function() {
    $('#newForm').modal('show')
  },

  handleNewForm: function(data) {
    console.log(JSON.stringify(data))

    // get the form selected by user (data.formid)
    this.fbref.child('seeds').child('forms').child(data.formid).once('value', (f) => {

      var newformRef = this.fbref.child('forms').push()
      var newMessageRef = this.fbref.child('messages').push()
      var newCourtiesFormRef = this.fbref.child('courties').child('acp').push()

      var newMessageData = { "email": data.email, "message": data.message, "formuid": newformRef.key() }
      var formSelected = this.state.formnames.find((f) => {
        if(f.value === data.formid) return f
      })
      var newCourtierFormData = { "formuid": newformRef.key(), "email": data.email, "type": formSelected.label, "createdat" : new Date() }

      newformRef.set(f.val())
      newMessageRef.set(newMessageData)
      newCourtiesFormRef.set(newCourtierFormData, (error) => {
        if (!error) {
          setTimeout(() => {
            $.ajax({type: "GET",url: this.props.serverapi + 'webhook/newform/' + newMessageRef.key() });
          }, 3000);
        }
      })
    })
  },

  render: function() {

    return (
      <div>
        <Button className="blue" onClick={this._onClickNewForm}>Nouveau Formulaire</Button>

        <Table
          header={ ['Type', 'Email', 'Date de creation'] }
          datakeys={ ['type', 'email', 'createdat'] }
          data={this.state.forms} />
        <ModalNewForm id='newForm'
               onApprove={this.handleNewForm} formnames={this.state.formnames}/>
      </div>
    );
  }
})
export default Home;
