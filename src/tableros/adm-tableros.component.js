
import Axios from 'axios';
import React, { Component } from 'react'
import Graficos from './Graficos';

export default class AdmTableros extends Component {

    constructor() {
        super();
        this.state = {
            chartData: {}
        }
    }

    render() {
        return (
            <div>
            <Graficos/>
            </div>
        )
    }
}