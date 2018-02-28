import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
const delay = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

const User = dynamic({
    component: async () => {
        while (!window.UserComps) await delay(1);
        return window.UserComps || IndexPage;
    },
});

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" render={() => <User />} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;