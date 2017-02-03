import React , { PropTypes } from "react";

import InputField from '../common/InputField.jsx';

export default class UploadsConfirmForm extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	remarks: '',
	    	errors: {}
	    }
	}
	
	componentDidMount() {
	}

	handleConfirm(e){
		e.preventDefault();
		const { remarks } = this.state;

		if(!remarks){
			this.setState({ errors: {remarks: 'Must enter some details.'} })
			return false;
		}

		Meteor.call('validation.insert', remarks, (err)=>{
			if(err){

			}else{

			}
		})
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {

 		return	<form onSubmit={this.handleConfirm.bind(this)}>
 			<InputField
	            field="remarks"
	            label="Remarks"
	            placeholder="add remarks"
	            type="text"
	            value={this.state.remarks}
	            error={this.state.errors.remarks}
	        	onChange={this.onChange.bind(this)}
	        />
 			<button type="submit">Confirm for validation</button>
 		</form>
	}
}