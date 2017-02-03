import React , { PropTypes } from "react";
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import RecordsAttach from "./RecordsAttach.jsx";
import { statusHelper , statusClassHelper } from '../../utils/helpers.js';
import { Validation } from '../../../api/certValidation.js';

class RecordsView extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { validation } = this.props;

		if(!validation){
			return <p>loading ..</p>
		}
		const li = validation.Files.map( (file)=>{

			return <li key={file._id}>
				<a href={file.url()}>{file.original.name}</a>
			</li>
		});

 		return	<div>
 			<button onClick={browserHistory.goBack}>Back</button>
 			<div className="row">
 				<div className="col-xs-3">
 					<ul>
		 				<li>Remarks: {validation.remarks}</li>
		 				<li>
		 					Status: <label className={statusClassHelper(validation.status)}>{statusHelper(validation.status)}</label>
		 				</li>
		 			</ul>
 				</div>
 				<div className="col-xs-3">
 					<ul>
			 			<label>files</label>
			 			{li}
			 		</ul>
 				</div>

 				<div className="col-xs-6">
 					<div className="panel panel-default">
					  	<div className="panel-heading">Results</div>
					  	<div className="panel-body">
 							<RecordsAttach validation={validation}/>
 						</div>
 					</div>
 				</div>

 				{ (validation.status == 3) ? <Link className="btn btn-default btn-success" to={`/payment/${validation._id}`}>Proceed to Payment</Link> : '' }
 			</div>
	 		
	  	</div>
	}
}

RecordsView.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { params } = props;

	var handle = Meteor.subscribe("validation.owner");

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    validation: Validation.findOne(params._id)
  };
}, RecordsView);