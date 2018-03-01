import { Switch, Route, Redirect, Link } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from './IndexPage';

const delay = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

const User = dynamic({
    component: async () => {
        while (!window.User) await delay(1);
        return window.User || IndexPage;
    },
});

const Stack = dynamic({
    component: async () => {
        while (!window.Stack) await delay(1);
        return window.Stack || IndexPage;
    },
});

const App = (props) => {
    return (
        <div>
            <Link to="/user">xxxsadfasd</Link>
            <Link to="/stack">sdfgsfg</Link>
            <Switch>
                <Route path="/user" children={() => <User />} />
                <Route path="/stack" children={() => <Stack />} />
                <Redirect to="/user" />
            </Switch>
        </div>
    )
}

export default App;
