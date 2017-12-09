import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import SwaggerUI from './components/SwaggerUI/SwaggerUI';
import DreddUI from './components/DreddUI/DreddUI';

import './App.css';

var fileContent = require("./out.md");


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      oasSelected: false,
      selectedOas: ''
    };
  }

  handleMenuClick = (event, child) => {
    this.setState({
      drawerOpen: true
    });
  };

  handleOasSelect = (event, value) => {
    this.setState({
      drawerOpen: false,
      oasSelected: true,
      selectedOas: value,
    }, function(){
      this.forceUpdate()
    });
  };



  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="OAS UI"
            onLeftIconButtonTouchTap={this.handleMenuClick}
          />
          < Drawer open={this.state.drawerOpen}>
            <Menu onChange={this.handleOasSelect}>
              <MenuItem value='/api/oas/petstore' primaryText="Petstore API" />
              <MenuItem value='/api/oas/uber' primaryText="Uber API" />
            </Menu>
          </Drawer>
          {this.state.oasSelected ? (
              <div key={this.state.selectedOas}>
                <SwaggerUI spec={this.state.selectedOas}></SwaggerUI>
              </div>
            ) : (
              <div>
                <h2>select swagger</h2>
              </div>
              )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
