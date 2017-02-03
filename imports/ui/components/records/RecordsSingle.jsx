import React from "react"
import { FormattedTime, FormattedDate } from 'react-intl';
import { Link } from 'react-router';

import { statusHelper , statusClassHelper } from '../../utils/helpers.js';

export default class RecordsSingle extends React.Component {
	constructor() {
	    super()
	}
	
	componentDidMount() {
	}

	render() {
		const { data } = this.props;

		const li = data.Files.map( (file)=>{
			return <li key={file._id}>
				<a href={file.url()}>{file.original.name}</a>
			</li>
		});

 		return	<tr>
 			<td>
 				<label className={statusClassHelper(data.status)}>{statusHelper(data.status)}</label>
 			</td>
 			<td><FormattedDate value={data.createdAt}/>, <FormattedTime value={data.createdAt}/></td>
 			<td>{data.remarks}</td>
 			<td>
 				{li}
 			</td>
 			<td>
 				<Link to={`/${data._id}`} className="btn btn-default">view</Link>
 			</td>
 		</tr>
	}
}