import { Meteor } from 'meteor/meteor';

import '../imports/api/files.js';
import '../imports/api/certValidation.js';
import '../imports/api/attach.js';
import '../imports/api/certificates.js';
import '../imports/api/evidence.js';

Meteor.startup(() => {
	// process.env.MONGO_URL = 'mongodb://localhost:27017/ecvs';

	if(_.isEmpty(Meteor.users.find().fetch()) ) {
		var users = [
			{name:"Client User",email:"client@email.com",roles:['1'] , groups: '4'},
			{name:"Client1 User",email:"client1@email.com",roles:['1'] , groups: '4'},

			{name:"Agent User",email:"agent@email.com",roles:['3'] , groups: '3'},
			{name:"Agent1 User",email:"agent1@email.com",roles:['1','2'] , groups: '3'},
			{name:"Agent2 User",email:"agent2@email.com",roles:['1'] , groups: '3'},

			{name:"Supervisor User",email:"supervisor@email.com",roles:['1'] , groups: '2'},
			{name:"Admin User",email:"admin@email.com",roles:['1','2','3','4'] , groups: '1' }
		];

		_.each(users, function (user) {
			var id;

			id = Accounts.createUser({
				email: user.email,
				password: "password",
				profile: { name: user.name , type: user.type }
			});

			if (user.roles.length > 0) {
				// Need _id of existing user record so this call must come
				// after `Accounts.createUser` or `Accounts.onCreate`
				Roles.addUsersToRoles(id, user.roles, user.groups);
			}

		});
	}
	
});