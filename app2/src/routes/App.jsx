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

const App = (props) => {
    console.log(1111)
    return (
        <div>
            <Link to="/user">xxxsadfasd</Link>
            <Link to="/mex">sdfgsfg</Link>
            <Switch>
                <Route path="/user" children={({ match }) => {
                    console.log(match)
                    return (
                        <User />
                    )
                }} />
                <Route path="/mex" children={({ match }) => {
                    console.log(match)
                    return (
                        <div>
                            xasdfasdfxxxx
                        </div>
                    )
                }} />
            </Switch>
        </div>
    )
}

export default App;
