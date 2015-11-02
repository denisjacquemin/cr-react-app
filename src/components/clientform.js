import React from 'react'
import FormBuilder from './semantic/form-builder'
import TextArea from './semantic/textarea'
var Button = require('react-semantify').Button;
import Firebase from 'firebase'

var ClientForm = React.createClass({

  getInitialState: function() {
      return {
        form:
          {
            "fieldset":[
               {
                  "label":"Conducteur principal",
                  "id":"maindriver",
                  "fields":[
                     {
                        "lastname":{
                           "label":"Nom",
                           "type":"text",
                           "placeholder":"ex: Dupont",
                           "wide":"eight"
                        },
                        "firstname":{
                           "label":"Prénom",
                           "type":"text",
                           "placeholder":"ex: Albert",
                           "wide":"eight"
                        }
                     },
                     {
                        "zipcode":{
                           "label":"Code Postal",
                           "type":"text",
                           "placeholder":"Code Postal",
                           "wide":"five",
                           "className": "fluid search selection",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        },
                        "birthdate":{
                           "label":"Date de naissance",
                           "type":"text",
                           "placeholder":"jj/mm/aaaa",
                           "wide":"four"
                        },
                        "function":{
                           "label":"Profession",
                           "type":"text",
                           "placeholder":"ex: Secrétaire, informaticien, ...",
                           "wide":"seven"
                        }
                     }
                  ]
               },
               {
                  "fields":[
                     {
                        "licensedate":{
                           "label":"Date de permis",
                           "type":"text",
                           "help":"La date se trouve sur le permis de conduire",
                           "placeholder":"jj/mm/aaaa",
                           "wide":"five",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        }
                     },
                     {
                        "licensewithdraw":{
                           "id":"licensewithdraw",
                           "label":"Votre permis vous a t'il été retiré?",
                           "type":"radiogroup",
                           "radios":[
                              {
                                 "label":"Oui",
                                 "type": "radio",
                                 "value":"yes",
                                 "checked":false,
                                 "name": "licensewithdrawradio",
                                 "onChecked": "() => {alert('coucou')}"
                              },
                              {
                                 "label":"Non",
                                 "type": "radio",
                                 "value":"no",
                                 "checked":true,
                                 "name": "licensewithdrawradio",
                                 "onChecked":"function coucou() {alert('coucou')}"
                              }
                           ],
                           "wide":"sixteen"
                        }
                     },
                     {
                        "licensewithdrawdescription":{
                           "id":"licensewithdrawdescription",
                           "display":"none",
                           "label":"Quelle sont les circonstances?",
                           "type":"textarea",
                           "placeholder":"ex: ivresse",
                           "wide":"sixteen"
                        }
                     }
                  ]
               },
               {
                  "label":"Autre conducteur",
                  "id":"otherdriver",
                  "fields":[
                     {
                        "otherdriver":{
                           "label":"Y a t'il un autre conducteur?",
                           "type":"radiogroup",
                           "name":"otherdriver",
                           "radios":[
                              {
                                 "label":"Oui",
                                 "type": "radio",
                                 "value":"yes",
                                 "checked":false,
                                 "name": "otherdriverradio",
                                 "onChecked":"function tog() {$('#otherdriverdetails').slideToggle()}"
                              },
                              {
                                 "label":"Non",
                                 "type": "radio",
                                 "value":"no",
                                 "checked":true,
                                 "name": "otherdriverradio",
                                 "onChecked":"function tog() {$('#otherdriverdetails').slideToggle()}"
                              }
                           ],
                           "wide":"sixteen"
                        }
                     }
                  ]
               },
               {
                  "id":"otherdriverdetails",
                  "display":"none",
                  "fields":[
                     {
                        "otherdriverlastname":{
                           "label":"Nom",
                           "type":"text",
                           "placeholder":"Ex: Dupont",
                           "wide":"eight",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        },
                        "otherdriverfirstname":{
                           "label":"Prénom",
                           "type":"text",
                           "placeholder":"ex: Albert",
                           "wide":"eight",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        }
                     },
                     {
                        "otherdriverzipcode":{
                           "label":"Code Postal",
                           "type":"text",
                           "placeholder":"Code Postal",
                           "className": "fluid search selection",
                           "wide":"eight",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        },
                        "otherdriverbirthdate":{
                           "label":"Date de naissance",
                           "type":"text",
                           "placeholder":"jj/mm/aaaa",
                           "wide":"eight",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        }
                     },
                     {
                        "otherdriverlicensedate":{
                           "label":"Date de permis",
                           "type":"text",
                           "placeholder":"jj/mm/aaaa",
                           "help":"La date se trouve sur le permis de conduire",
                           "wide":"eight",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        }
                     }
                  ]
               },
               {
                  "id":"car",
                  "label":"Vehicule",
                  "fields":[
                     {
                        "registrationdate":{
                           "label":"Date d'immatriculation",
                           "type":"text",
                           "placeholder":"jj/mm/aaaa",
                           "help":"La date se trouve sur la carte grise",
                           "wide":"five",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        },
                        "brand":{
                           "id": "brand",
                           "label":"Marque",
                           "type":"text",
                           "help":"Entrez la marque, ex: Renault",
                           "placeholder": "ex: Renault, BMW, Fiat",
                           "wide":"five",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        },
                        // "brand":{
                        //    "label":"Marque",
                        //    "type":"dropdown",
                        //    "id":"brand",
                        //    "help":"Choisissez la marque",
                        //    "className": "fluid search selection",
                        //    "wide":"five",
                        //    "seedsname":"'brand'",
                        //    "onChange": "(value) => {this.props.changeHandler(this.props.datakey, value) }"
                        // },
                        "model":{
                           "id": "model",
                           "label":"Modèle",
                           "type":"text",
                           "help":"Entrez le modele, ex: Clio",
                           "placeholder": "ex: Clio, 218d, class b",
                           "wide":"six",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        }
                        // "model":{
                        //    "id": "model",
                        //    "label":"Modèle",
                        //    "type":"dropdown",
                        //    "help":"Choisissez le modele",
                        //    "className": "fluid search selection",
                        //    "wide":"six",
                        //    "seedsname": "'model' + $('#brand').value()",
                        //    "onChange": "(value) => {this.props.changeHandler(this.props.datakey, value)}"
                        // }
                     },
                     {
                        "power":{
                           "label":"kW",
                           "type":"text",
                           "help":"La puissance se trouve sur la carte grise",
                           "wide":"two",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        },
                        "sport":{
                           "label":"Caractère sportif",
                           "type":"dropdown",
                           "help":"Choisissez",
                           "className": "fluid search selection",
                           "wide":"four",
                           "seedsname":"sport",
                           "default": "Choisissez",
                           "onChange": "function sportChange(value) {this.props.changeHandler(this.props.datakey, value)}"
                        },
                        "cabriolet":{
                           "label":"Cabriolet",
                           "type":"dropdown",
                           "default": "Choisissez",
                           "className": "fluid search selection",
                           "wide":"three",
                           "seedsname":"cabriolet",
                           "onChange": "function cabrioletChange(value) {this.props.changeHandler(this.props.datakey, value)}"
                        },
                        "numberseats":{
                           "id": "numberseats",
                           "label":"Nombre de place",
                           "type":"text",
                           "help":"Nombre de place dans le vehicule, ex: 5",
                           "placeholder": "ex: 2, 5, 7",
                           "wide":"four",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        },
                        "numberkmyear":{
                           "label":"# de km/an",
                           "type":"text",
                           "placeholder":"ex: 35 000",
                           "wide":"three",
                           "onChange": "this.props.changeHandler(this.props.datakey, e.target.value)"
                        }
                     }
                  ]
               }
            ],
            "label":"Auto 1",
            "type":"auto1"
          }
      };
  },

  componentWillMount: function() {
    this.fbref = new Firebase(this.props.fbroot);
    var path = 'forms/' + this.props.params.formuid
    this.fbref.child(path).on('value', (f) => {
      this.setState({form: f.val()});
    });
  },

  _onClickSend: function() {
    $.ajax({type: "GET",url: this.props.serverapi + 'webhook/sendform/' + this.props.params.formuid});
  },

  handleChange: function(datakey, value) {
    // save data when it changes
    var path = 'forms/' + this.props.params.formuid + '/fieldset/fields/' + datakey
    console.log('save ' + value + ' to path ' + path);
    this.fbref.child(path).update( {value: value} )
  },

  test: () => {alert('coucou')},

  render: function() {

    var message = {title: 'message', id: 'message', label:'Message supplémentaire'}

    return (

        <div className="ui grid stackable">
          <div className="sixteen wide column">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="sixteen wide tablet eleven wide computer column">
            <FormBuilder className="ui form"
                  form={this.state.form}
                  changeHandler={this.handleChange}
                  fbroot={this.props.fbroot} />
          </div>
          <div className="sixteen wide tablet five wide computer column">
            <div className="ui form segment raised">
              <p>Une fois le formulaire rempli, veuillez l&quot;envoyer</p>
              <TextArea data={message} />
              <div className="ui divider"></div>
              <Button className="fluid blue" onClick={this._onClickSend}>Envoyer</Button>
            </div>
          </div>
        </div>

    );
  }
})
export default ClientForm;
