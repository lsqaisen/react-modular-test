import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Layout from './layout';
import App from './routes/App';
// import User from './routes/User/Comps/index';
function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Layout>
				<Switch>
					<Route path="/">
						<Router history={history}>
							<App />
						</Router >
					</Route>
				</Switch>
			</Layout>
		</Router>
	);
}

export default RouterConfig;
