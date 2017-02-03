import React from "react";
import { FormattedTime, FormattedDate } from 'react-intl';


import InputField from '../common/InputField.jsx';

export default class UploadsSingle extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	toogleEdit: false,
	    	description: '',
	    	errors: {}
	    }

	}
	
	componentDidMount() {
		const { data } = this.props;
		this.setState({ description: data.description });
	}

	handleRemove(){
		const { data } = this.props;

		swal({
		  title: "Are you sure?",
		  text: "You will not be able to recover this imaginary file!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  closeOnConfirm: true,
		  html: false
		}, ()=>{
			Meteor.call('files.remove', data._id, (err)=>{
				if(err){
					console.log(err);
				}else{
					
				}
			})
		  
		});

		
	}

	handelDescription(){
		this.setState({toogleEdit: !this.state.toogleEdit })
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSave(e){
		e.preventDefault();
		const { data } = this.props;
		const { description } = this.state;

		Meteor.call('files.update.description', data._id, description , (err)=>{
			if(err){

			}else{
				this.handelDescription();
			}
		})
		
	}

	render() {
		const { data } = this.props;
		const { toogleEdit } = this.state;

		if( data.url() == null ){
			
			return <tr>
				<td colSpan="4">
					<p>uploading please wait..</p>
				</td>
			</tr>
		}

 		return	<tr>
 				<td><button onClick={this.handleRemove.bind(this)}><i className="fa fa-trash"></i></button></td>
 				<td><a href={data.url()}>{data.original.name  }</a></td>
				<td>
					{
						(toogleEdit) ? 
						<form onSubmit={this.handleSave.bind(this)}>
							<InputField
					            field="description"
					            placeholder="Description"
					            type="text"
					            value={this.state.description}
					            error={this.state.errors.description}
					        	onChange={this.onChange.bind(this)}
					        />
						</form>:
						<p onClick={this.handelDescription.bind(this)}> {(data.description) ? data.description : '[click to add description]'}</p>
					}
				</td>
				<td>
					<FormattedDate value={data.uploadedAt}/>, <FormattedTime value={data.uploadedAt}/>
				</td>
			</tr>
	}
}