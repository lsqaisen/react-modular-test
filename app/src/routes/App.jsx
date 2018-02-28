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
        while (!window.UserComps) await delay(1);
        return window.UserComps || IndexPage;
    },
});

const Stack = dynamic({
    component: async () => {
        while (!window.StackComps) await delay(1);
        return window.StackComps || IndexPage;
    },
});

const App = (props) => {
    console.log(11112)
    return (
        <div>
            <Link to="/user">xxxsadfasd</Link>
            <Link to="/stack">sdfgsfg</Link>
            <Switch>
                <Route path="/user" children={({ match }) => {
                    console.log(match)
                    return (
                        <User />
                    )
                }} />
                <Route path="/stack" children={({ match }) => {
                    console.log(match)
                    return (
                        <Stack />
                    )
                }} />
            </Switch>
        </div>
    )
}

export default App;
