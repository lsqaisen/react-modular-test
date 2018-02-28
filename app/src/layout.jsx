import { Component } from 'react';
import { connect } from 'dva';

class Layout extends Component {
	render() {
		const { children, loading } = this.props;
		return (
			<div style={{ width: '100%', height: '100%' }}>
				{children}
			</div>
		)
	}
}

export default connect(props => props)(Layout);