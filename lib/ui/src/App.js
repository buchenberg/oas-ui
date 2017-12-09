import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SwaggerUI from './components/SwaggerUI/SwaggerUI';

import './App.css';

var fileContent = require("./out.md");


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      oasSelected: false,
      selectedOas: '',
      oasIndex: undefined
    };
  };

  componentDidMount() {
    fetch('/api/oas')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          oasIndex: responseJson
        })
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleMenuClick = (event, child) => {
    this.setState({
      open: true
    });
  };

  handleOasSelect = (event, value) => {
    this.setState({
      open: false,
      oasSelected: true,
      selectedOas: value,
    }, function () {
      this.forceUpdate()
    });
  };

  handleListClick = (event) => {
    this.setState({
      open: false,
      oasSelected: true,
      selectedOas: event.value,
    }, function () {
      this.forceUpdate()
    });
  };

  buildMenus = (props) => {
    return this.state.oasIndex.map(function (spec, index) {
      let menuGroup = [];
      menuGroup.push(<Subheader key={'subheader_' + spec.title}>{spec.title}</Subheader>);
      menuGroup.push(
        spec.specs.map(function (oas, index) {
          return <MenuItem key={'menu_' + oas.title} value={'/api' + oas.path} primaryText={oas.title} />
        })
      )
      return menuGroup;
    })
  };



  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="OAS UI"
            onLeftIconButtonTouchTap={this.handleMenuClick}
          />
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={open => this.setState({ open })}>
            <Menu onChange={this.handleOasSelect}>
              {this.state.oasIndex && this.buildMenus()}
            </Menu>
          </Drawer>
          {this.state.oasSelected ? (
            <div key={this.state.selectedOas}>
              <SwaggerUI spec={this.state.selectedOas}></SwaggerUI>
            </div>
          ) : (
              <div>
                Select OAS
              </div>
            )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
