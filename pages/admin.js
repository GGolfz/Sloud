import React, {Fragment, useEffect, useState} from 'react'
import io from "socket.io-client";
let socket;
const Admin = () => {
	const  [questionName,setQuestionName] = useState('')
	useEffect(() => {
		socket = io();
	},[])
	const createQuestion = () => {
		const key = prompt('Admin Key ?')
		socket.emit('add-question',{
			key: key,
			questionName
		})
	}
	return (
	<Fragment>
		<div>
			<input type="text" value={questionName} onChange={e=>setQuestionName(e.target.value)}/>
			<button onClick={createQuestion}>create</button>
		</div>
	</Fragment>)
}

export default Admin;