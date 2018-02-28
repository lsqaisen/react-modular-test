import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
const delay = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

const Stack = dynamic({
    component: async () => {
        while (!window.StackComps) await delay(1);
        return window.StackComps || IndexPage;
    },
});

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" render={() => <Stack />} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;