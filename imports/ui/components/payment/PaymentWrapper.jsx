import React , { PropTypes } from "react";
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import PaymentSingle from './PaymentSingle.jsx';
import { Attach } from '../../../api/attach.js';

class PaymentWrapper extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	handlePaid(){
		swal({
		  title: "Are you sure?",
		  text: "Please review your cart!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, im sure!",
		  closeOnConfirm: true,
		  html: false
		}, ()=>{
			const { params } = this.props;

			Meteor.call('validation.update', params._id, (err)=>{
				if(err){
					console.log( err );
				}else{

				}
			})
		});
	}

	render() {
		const { attach } = this.props;
		let total = 0;

		const tr = attach.map((attaches)=>{
			if(attaches.active){
				total = parseInt(attaches.cost) + parseInt(total);
			}
			
			return <PaymentSingle key={attaches._id} attaches={attaches}/>
		});


 		return	<div>
 			<button onClick={browserHistory.goBack}>Back</button>
 			<div className="row">
 				<div className="col-xs-8">
 					<table className="table table-striped table-bordered">
		 				<thead>
		 					<tr>
		 						<th>Certificate</th>
		 						<th>Date Sorted</th>
		 						<th>Remarks</th>
		 						<th>Cost</th>
		 						<th></th>
		 					</tr>
		 				</thead>
		 				<tbody>
		 					{tr}
		 					<tr>
		 						<td colSpan="3"></td>
		 						<td>Total: {total}</td>
		 						<td>
		 							<button onClick={this.handlePaid.bind(this)} type="button" className="btn btn-primary">
										Paid
									</button>
		 						</td>
		 					</tr>
		 				</tbody>
		 			</table>
 				</div>
 			</div>
	  	</div>
	}
}

PaymentWrapper.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { params } = props;
	var handle = Meteor.subscribe("attach.select", params._id );

  return {
    currentUser: Meteor.user(),
    listLoading: !handle.ready(),
    attach: Attach.find({validationId: params._id}).fetch()
  };
}, PaymentWrapper);