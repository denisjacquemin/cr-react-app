import React from 'react'
var Field = require('react-semantify').Field;
var Dropdown = require('react-semantify').Dropdown;
var Item = require('react-semantify').Item;
var Form = require('react-semantify').Form;
var Grid = require('react-semantify').Grid;
var Column = require('react-semantify').Column;
var Row = require('react-semantify').Row;
var Input = require('react-semantify').Input;


//import Firebase from 'firebase'


var Action = React.createClass({

  render: function() {

    var className = 'ui button ' + this.props.className

    return (
        <div className={className}>{this.props.label}</div>
    )
  }
})


var ModalNewForm = React.createClass({

  componentDidMount: function() {
    if (this.props.onApprove) {
      $(React.findDOMNode(this)).modal({
        onApprove: (el) => {
          console.log('In onApprove');
          //var data = $(this.getDOMNode()).find('.ui.form').serializeArray()
          //console.log('data: ' + JSON.stringify(data));
          var formData = {}
          formData['formid'] = $(React.findDOMNode(this)).find('.formid .item.selected').data('item-value')
          formData['email'] = $(React.findDOMNode(this)).find('.email input').val()
          formData['message'] = $(React.findDOMNode(this)).find('.message').val()

          console.log('formData: ' + JSON.stringify(formData));

          this.props.onApprove(formData)
        }
      })
    } else {
      $(React.findDOMNode(this)).modal()
    }

  },

  componentWillMount: function() {
    this.modalActions = [
      { label: 'Annuler', className: 'cancel' },
      { label: 'Envoyer', className: 'approve blue'}
    ]


    // ItemsUI = [
    //  <Item data-item-value="auto1">RC Auto</Item>,
    //  <Item data-item-value="omnium">Omnium</Item>
    // ]
    //  this.state.items.forEach( (i) => {
    //    console.log("i: " + JSON.stringify(i));
    //    ItemsUI.push(<Item data-value={i.value}>{i.label}</Item>)
    //  })

    // var formNamesMenuUI = React.createElement('div', {"className": "menu"}, this.formnames)
    // this.

  },

  render: function() {

    var ItemsUI = []
    this.props.formnames.forEach((f) => {
        ItemsUI.push(<Item data-item-value={f.value}>{f.label}</Item>)
    })
    var MenuUI = React.createElement('div', {"className": "menu"}, ItemsUI)

    var modalContentUI = [
          <Form>
            <Grid>
              <Row>
                <Column className="four wide">
                  <Field>
                    <label>Type de formulaire</label>
                    <Dropdown className="fluid search selection formid" init={true}>
                      <input type="hidden" name="formid"/>
                      <i className="dropdown icon"></i>
                      <div className="default text">Choisissez un formulaire</div>
                      {MenuUI}
                    </Dropdown>
                  </Field>
                </Column>
              </Row>
              <Row>
                <Column className="four wide">
                  <Field>
                    <label>Email client</label>
                    <Input placeholder="Email client" type="text" name="email" className="email"></Input>
                  </Field>
                </Column>
              </Row>
              <Row>
                <Column className="sixteen">
                  <Field>
                      <label>Message</label>
                      <textarea name="message" name="message" className="message">
                      Bureau Acp Assurances Sprl
                      Rue de louveigné 22
                      4052 Beaufays
                      04/366.11.61
                      </textarea>
                  </Field>
                </Column>
              </Row>
            </Grid>
          </Form>]

    var actions = []
    this.modalActions.forEach((a) => {
      actions.push(<Action label={a.label} className={a.className} />)
    })
    var actionsUI = React.createElement('div', {className: 'actions'}, actions)

    return (
      <div className="ui modal large" id={this.props.id}>
        <i className="close icon"></i>
        <div className="header">Nouveau formulaire</div>
        <div className="content">
          { modalContentUI }
        </div>
        { actionsUI }
      </div>
    )
  }
})
export default ModalNewForm;
