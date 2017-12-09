import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import SwaggerUI from './components/SwaggerUI/SwaggerUI';
import Navigation from './components/Navigation/Navigation'
// import DreddUI from './components/DreddUI/DreddUI';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  handleMenuClick = (event, child) => {
    this.setState({
      drawerOpen: true
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
          <Drawer open={this.state.drawerOpen}>
            <Navigation />
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
