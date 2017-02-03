import React from 'react';
import { Route, IndexRoute } from "react-router"

import requireAuth from './utils/requireAuth.jsx';

import App from './App.jsx';
import DashboardWrapper from './components/dashboard/DashboardWrapper.jsx';
import UploadsWrapper from './components/uploads/UploadsWrapper.jsx';
import RecordsView from './components/records/RecordsView.jsx';
import PaymentWrapper from './components/payment/PaymentWrapper.jsx';

export default (
	<Route>
		<Route path="/" component={ requireAuth(App) }>
			<IndexRoute component={DashboardWrapper} />
			<Route path="uploads" component={UploadsWrapper} />
			<Route path=":_id" component={RecordsView} />
			<Route path="payment/:_id" component={PaymentWrapper} />
		</Route>

	</Route>
)