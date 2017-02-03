import React , { PropTypes } from "react"
import { createContainer } from 'meteor/react-meteor-data';

import { Validation } from '../../../api/certValidation.js';
import { Files } from '../../../api/files.js';

import RecordsSingle from './RecordsSingle.jsx';

class RecordsWrapper extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { validation } = this.props;

		const tr = validation.map((file)=>{

			return <RecordsSingle key={file._id} data={file}/>
		});

 		return	<div>
 			<label>Validation</label>
 			<table className="table table-striped table-bordered">
 				<thead>
 					<tr>
 						<th>Status</th>
 						<th>Date Added</th>
 						<th>Remarks</th>
 						<th>Files</th>
 						<th></th>
 					</tr>
 				</thead>
 				<tbody>
 					{tr}
 				</tbody>
 			</table>
	  	</div>
	}
}

RecordsWrapper.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {

	var handle = Meteor.subscribe("validation.owner");

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    validation: Validation.find({}, { sort: { createdAt: -1 } }).fetch()
  };
}, RecordsWrapper);