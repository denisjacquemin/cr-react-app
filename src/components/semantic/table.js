import React from 'react'

var Table = React.createClass({

  // getInitialState() {
  //     return {
  //         value: null
  //     };
  // },

  componentDidMount() {
    // $('.ui.selection.dropdown').dropdown({
    //   dataType: 'jsonp',
    //   apiSettings   : {
    //     onResponse: function(githubResponse) {
    //       var
    //         response = {
    //           results : []
    //         }
    //       ;
    //       // translate github api response to work with dropdown
    //       $.each(githubResponse.items, function(index, item) {
    //         response.results.push({
    //           name: item.name,
    //           value: item.id
    //         });
    //       });
    //       return response;
    //     },
    //     url: '//api.github.com/search/repositories?q={query}'
    //   },
    //   onChange: (value) => {
    //     this.setState({
    //         value
    //     });
    //   }
    // });
  },

  componentDidUpdate() {
      //$('.ui.dropdown').dropdown('refresh');
  },

  render: function() {
      var headers = [];
      if (this.props.header) {
        for (var i in this.props.header) {
          headers.push(<th>{this.props.header[i]}</th>)
        }
      }
      var headerUI = React.createElement('tr', {}, headers);

      var rows = [];
      if (this.props.data) {
        for (var i in this.props.data) {
          rows.push(<tr><td>{this.props.data[i][this.props.datakeys[0]]}</td><td>{this.props.data[i][this.props.datakeys[1]]}</td><td>{this.props.data[i][this.props.datakeys[2]]}</td></tr>)
        }
      }
      var rowsUI = React.createElement('tbody', {onChange: this.handleLevelChange}, rows);

      return (
        <table className="ui celled table">
          <thead> {headerUI} </thead>

          { rowsUI }

          <tfoot></tfoot>
        </table>
      );
  }
})
export default Table;
