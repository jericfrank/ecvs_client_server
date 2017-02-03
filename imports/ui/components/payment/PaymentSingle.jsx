import React from "react";
import { FormattedTime, FormattedDate } from 'react-intl';

import { Attach } from '../../../api/attach.js';

export default class PaymentSingle extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	check: true
	    }
	}
	
	componentDidMount() {
		const { attaches } = this.props;
		this.setState({check: attaches.active});
	}

	handleCheck(){
		const { attaches } = this.props;
		
		Meteor.call('attach.update', attaches._id, !this.state.check , (err)=>{
			if(err){

			}else{
				this.setState({check: !this.state.check});
			}
		});
	}

	render() {
		const { attaches } = this.props;

		if(!attaches.Certificates){
			return <tr>
				<td colSpan="5">loading..</td>
			</tr>
		}

 		return	<tr>
			<td className={(!attaches.active) ? 'erase' : ''}>
				{attaches.Certificates.original.name}
			</td>
			<td className={(!attaches.active) ? 'erase' : ''}><FormattedDate value={attaches.createdAt}/>, <FormattedTime value={attaches.createdAt}/></td>
			<td className={(!attaches.active) ? 'erase' : ''}>{attaches.remarks}</td>
			<td className={(!attaches.active) ? 'erase' : ''}>{attaches.cost}</td>
			<td>
				<input type="checkbox" checked={!this.state.check} onChange={this.handleCheck.bind(this)} />
			</td>
		</tr>
	}
}