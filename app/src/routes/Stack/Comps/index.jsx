
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, Link } from 'dva/router';

const Stack = () => {
    console.log(22222)
    return (
        <div className="vyauto">
            <Link to="/stack/list">home</Link>
            <Link to="/stack/list/xxxxx">xxxx</Link>
            <Switch>
                <Route path="/stack/list/:stackname" component={require('./Details')} />
                <Route path="/stack/list" component={require('./Stack')} />
                <Redirect to="/stack/list" />
            </Switch>
        </div>
    )
}

export default Stack;
