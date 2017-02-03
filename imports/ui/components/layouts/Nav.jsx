import React, { Component , PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../auth/AccountsUIWrapper.jsx';

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <nav className="navbar navbar-default">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="/">ECVS</a>
			    </div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      
			      <ul className="nav navbar-nav">
			      	<li><Link to={`/`}>Dashboard</Link></li>
			        <li><Link to={`/uploads`}>Upload</Link></li>
			      </ul>

			      <ul className="nav navbar-nav navbar-right">
			        <li>
			        	<a href="#">
			        		<AccountsUIWrapper />
			        	</a>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
    );
  }
}

Nav.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, Nav);