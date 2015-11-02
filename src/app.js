import React from 'react'
import Router from 'react-router'

//import MenuTop from './components/menu-top/menu-top'
import Home from './components/home'
import Seeds from './components/seeds'
import ClientForm from './components/clientform'
import PageNotFound from './components/page-not-found'

var Route = Router.Route
var Link = Router.Link
var RouteHandler = Router.RouteHandler
var DefaultRoute = Router.DefaultRoute
var NotFoundRoute = Router.NotFoundRoute

var App = React.createClass({
  getInitialState: function() {
    return {
      loggedUser: {
        uid: null,
        name: null,
        URLid: null
      }
    }
  },

  handleUID: function(uid, name, URLid) {
    this.setState({
      loggedUser: {
        uid: uid,
        name: name,
        URLid: URLid
      }
    });
  },

  render: function() {
    //<MenuTop uidHandler={this.handleUID} loggedUser={this.state.loggedUser}/>
    return (
      <div className="main ui container">
        <RouteHandler
          loggedUser={this.state.loggedUser}
          fbroot='https://clientrequest.firebaseio.com/'
          serverapi='http://localhost:5000/'/>
      </div>
    )
  }
});

var routes = (
    <Route path="/" handler={App}>
      <DefaultRoute handler={Home} />
      <Route path="f/:formuid" name="clientform" handler={ClientForm} />
      <Route path="seeds" name="seeds" handler={Seeds} />
      <NotFoundRoute name="pagenotfound" handler={PageNotFound}  />
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body)
});
