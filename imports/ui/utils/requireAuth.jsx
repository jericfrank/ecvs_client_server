import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import LoginWrapper from '../components/login/LoginWrapper.jsx';

export default function(ComposedComponent) {
	class RequireAuth extends React.Component {
		constructor() {
		    super()
		}

		handleLogout(e){
			e.preventDefault();
			Meteor.logout();
		}

		render() {
			// if(this.props.currentUser){
			// 	const client = Roles.userIsInRole( this.props.currentUser._id  , ['1'], '4');
			// 	if(!client){

			// 		return <p>not allowed access. <a href="#" onClick={this.handleLogout.bind(this)}>logout me.</a></p>
			// 	}
			// }
			

			return (Meteor.user()) ? <ComposedComponent {...this.props} /> : <LoginWrapper />
		}
	}

	return createContainer(() => {

	  return {
	    currentUser: Meteor.user()
	  };
	}, RequireAuth);
}