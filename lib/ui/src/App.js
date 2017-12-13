import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import IconCouch from 'material-ui/svg-icons/content/weekend';
import SwaggerUI from './components/SwaggerUI/SwaggerUI';

import './App.css';

const couchIcon = <IconCouch />;

const style = {
  "background-color": "#e8e8e8"
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      oasSelected: false,
      selectedOas: '',
      oasIndex: undefined,
      selectedIndex: 0,
    };
  };

  componentDidMount() {
    fetch('/oas')
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

  handleHamburgerClick = (event, child) => {
    this.setState({
      open: true
    });
  };

  handleOasSelect = (event, value) => {
    this.setState({
      open: false,
      oasSelected: true,
      selectedOas: value
    });
  };

  buildMenus = (props) => {
    return this.state.oasIndex.map(function (spec, index) {
      let menuGroup = [];
      menuGroup.push(<Subheader key={'subheader_' + spec.title}>{spec.title}</Subheader>);
      menuGroup.push(
        spec.specs.map(function (oas, index) {
          return <MenuItem key={'menu_' + oas.title} value={oas.path} primaryText={oas.title} />
        })
      )
      return menuGroup;
    })
  };

  select = (index) => this.setState({ selectedIndex: index });

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="OAS UI"
            onLeftIconButtonTouchTap={this.handleHamburgerClick}
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
          <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
            <BottomNavigation style={style} selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Relax"
                icon={couchIcon}
                onClick={() => this.select(2)}
              />

            </BottomNavigation>
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
