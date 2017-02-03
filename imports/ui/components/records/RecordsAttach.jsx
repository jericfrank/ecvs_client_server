import React from "react";
import { createContainer } from 'meteor/react-meteor-data';

import RecordsAttachSingle from "./RecordsAttachSingle.jsx";
import { Attach } from '../../../api/attach.js';

class RecordsAttach extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { attach } = this.props;
		
		const tr = attach.map( (attaches)=>{

			return <RecordsAttachSingle key={attaches._id} attaches={attaches}/>
		});

 		return	<div>
 			<table className="table table-striped table-bordered">
 				<thead>
 					<tr>
 						<th>Certificate</th>
 						<th>Date Sorted</th>
 						<th>Remarks</th>
 						<th>Cost</th>

 						<th>Evidence</th>
 					</tr>
 				</thead>
 				<tbody>
 					{tr}
 				</tbody>
 			</table>
	  	</div>
	}
}

export default createContainer((props) => {
	const { validation } = props;
	var handle = Meteor.subscribe("attach.select", validation._id );

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    attach: Attach.find({validationId: validation._id}).fetch()
  };
}, RecordsAttach);