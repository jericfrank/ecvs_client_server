import React from "react";
import { FormattedTime, FormattedDate } from 'react-intl';
import { createContainer } from 'meteor/react-meteor-data';

import { Evidence } from '../../../api/evidence.js';

class RecordsAttachSingle extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { attaches , evidence } = this.props;


		if(!attaches.Certificates){
			return <tr key={attaches._id}>
				<td colSpan="4">
					loading ..
				</td>
			</tr>
		}

		const li = evidence.map( (evidences)=>{
			return <li key={evidences._id}>
				<a href={evidences.url()}>{evidences.original.name}</a>
			</li>
		});

 		return <tr>
			<td className={(!attaches.active) ? 'erase' : ''}>
				{(attaches.active) ? <a href={attaches.Certificates.url()}>{attaches.Certificates.original.name}</a> : attaches.Certificates.original.name}

			</td>
			<td className={(!attaches.active) ? 'erase' : ''}><FormattedDate value={attaches.createdAt}/>, <FormattedTime value={attaches.createdAt}/></td>
			<td className={(!attaches.active) ? 'erase' : ''}>{attaches.remarks}</td>
			<td className={(!attaches.active) ? 'erase' : ''}>{attaches.cost}</td>
			<td className={(!attaches.active) ? 'erase' : ''}>
				{(attaches.active) ? li : 'not available'}
			</td>
		</tr>
	}
}

export default createContainer((props) => {
	const { attaches } = props;

	let _id = null;

	if(attaches.Certificates){
		_id = attaches.Certificates._id
	}

	var handle = Meteor.subscribe("evidence.select", _id);

  
  return {
  	listLoading: !handle.ready(),
    currentUser: Meteor.user(),
    evidence: Evidence.find({ certificatesId: _id }).fetch()
  };
}, RecordsAttachSingle);