import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {setLS} from "./Common.jsx";
import Test from "./Test.jsx";

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Test />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
