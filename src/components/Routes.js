import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HomePage } from './HomePage';


export default class Routes extends Component {
    render() {
        return (
            <Router>
                    {/* <Switch> */}
                        <Route exact path="/" component={() => <HomePage />} />
                        <Route path="/homepage" component={() => <HomePage />} />
                    {/* </Switch> */}
            </Router>
        )
    }
}
