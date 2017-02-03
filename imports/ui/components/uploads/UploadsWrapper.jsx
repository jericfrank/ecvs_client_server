import React , { PropTypes } from "react";
import { createContainer } from 'meteor/react-meteor-data';

import UploadsForm from './UploadsForm.jsx';
import UploadsSingle from './UploadsSingle.jsx';
import UploadsConfirmForm from './UploadsConfirmForm.jsx';

import { Files } from '../../../api/files.js';

class UploadsWrapper extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { files } = this.props;

		const tr = files.map((file)=>{
			
			return <UploadsSingle key={file._id} data={file}/>
		})

 		return	<div>
 			UploadsWrapper
 			<UploadsForm {...this.props} />
 			<hr/>
 			<table className="table table-striped table-bordered">
 				<thead>
 					<tr>
 						<th></th>
 						<th>filename</th>
 						<th>description</th>
 						<th>date uploaded</th>
 					</tr>
 				</thead>
 				<tbody>
 					{tr}
 				</tbody>
 			</table>
 			{ (_.isEmpty(files)) ? null : <UploadsConfirmForm /> }

	  	</div>
	}
}

UploadsWrapper.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {
	var handle = Meteor.subscribe("files.owner");

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    files: Files.find({userId: Meteor.userId() , active: false}).fetch()
  };
}, UploadsWrapper);