export function statusHelper(status) {
	let statusTitle = '';

	switch(status){
		case 0: 
			statusTitle = 'Newly Uploaded';
			break;
		case 1: 
			statusTitle = 'Sorted';
			break;
		case 2: 
			statusTitle = 'Qouted';
			break;
		case 3: 
			statusTitle = 'Billed';
			break;
		case 4: 
			statusTitle = 'Paid';
			break;
		case 5: 
			statusTitle = 'Complete';
			break;
		default: 
			statusTitle = 'Undefine status';
			break;
	}

  	return statusTitle;
}

export function statusClassHelper(status) {
	let statusTitle = '';

	switch(status){
		case 0: 
			statusTitle = 'label label-primary';
			break;
		case 1: 
			statusTitle = 'label label-warning';
			break;
		case 2: 
			statusTitle = 'label label-info';
			break;
		case 3: 
			statusTitle = 'label label-danger';
			break;
		case 4: 
			statusTitle = 'label label-default';
			break;
		case 5: 
			statusTitle = 'label label-success';
			break;
		default: 
			statusTitle = 'Undefine status';
			break;
	}

  	return statusTitle;
}