import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          campsites: CAMPSITES
        };
    }

    render() {
        return <Directory campsites={this.state.campsites} />;
    }
}

export default Main;