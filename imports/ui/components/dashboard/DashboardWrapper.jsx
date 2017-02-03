import React from "react"

import RecordsWrapper from "../records/RecordsWrapper.jsx";

export default class DashboardWrapper extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {

 		return	<div>
 			DashboardWrapper

 			<RecordsWrapper />
	  	</div>
	}
}