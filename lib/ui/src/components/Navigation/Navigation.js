import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oasSelected: false,
            selectedOas: '',
            oasIndex: {}
        };
    }

    componentDidMount() {
        fetch('/api/oas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
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

    handleOasSelect = (event, value) => {
        this.setState({
            drawerOpen: false,
            oasSelected: true,
            selectedOas: value,
        });
    };


    render() {
        return (
            <Menu onChange={this.handleOasSelect}>
                <MenuItem value='/api/oas/petstore' primaryText="Petstore API" />
                <MenuItem value='/api/oas/uber' primaryText="Uber API" />
            </Menu>
        );
    }
}


export default Navigation;
