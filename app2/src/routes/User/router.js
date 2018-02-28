import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import User from './Comps/index';
function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/"  >
                    <Router history={history}>
                        <App />
                    </Router >
                </Route>
            </Switch>
        </Router>
    );
}

export default RouterConfig;