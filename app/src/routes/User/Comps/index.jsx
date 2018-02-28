
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'dva/router';

import UserComp from './User';
const User = () => {
    console.log(22222)
    return (
        <div className="vyauto">
            <Switch>
                <Route path="/user/list" component={UserComp} />
                <Redirect to="/user/list" />
            </Switch>
        </div>
    )
}

export default User;
