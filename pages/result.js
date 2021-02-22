import React, {Fragment, useEffect, useState} from 'react'
import io from "socket.io-client";
let socket;
const Result = () => {
	const [data, setData] = useState(null);
	useEffect(()=>{
		socket = io()
		socket.emit('fetch-answer');
		socket.on('get-answer',(d) => {
			setData(d);
		})
		socket.on('clear',()=>{
			setData(null)
		})
	},[])
	return (<Fragment>
		{
			data ? (
				<div>
					<div>
					{
						data.questionName
					}</div>
					<div>{data.answer.toString()}</div>
				</div>
			) : <div>No Data </div>
		}
	</Fragment>)
}

export default Result;