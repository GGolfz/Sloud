const app = require('express')();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;
var cloudData = [];
var currentId = null;
// Data Template

/*
	{
		questionId: <Int>,
		questionName: <String>,
		answerList: <Array<String>>
	}
*/
io.on("connect", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("force-disconnect", () => {
    socket.disconnect();
  });
  socket.on("fetch-data",() => {
	if(currentId){
		const data = cloudData.find((e) => e.questionId = currentId);
		const {questionId,questionName} = data;
		return {
			questionId,
			questionName
		}
	} else {
		return null
	}
  })
  socket.on("add-question",(data) => {
	const {key, questionName} =  data;
	if(key === adminKey) {
		const questionId = cloudData.length + 1;
		currentId = questionId;
		cloudData.push({
			questionId,
			questionName,
			answer: []
		})
		// Emit to all user;
	} else {
		// Emit fail
	}
  })
  socket.on("answer", (data) => {
	const {questionId, answer} = data;
	const findIndex = cloudData.findIndex((d) => d.questionId == questionId);
	if(findIndex != -1){
		cloudData[findIndex].answer.push(answer);
		// Emit to admin;
	} else {
		// Emit fail
	}
  })
  socket.on("close", (data) => {
	cloudData = []
	// Emit end to all user;
  })
});
nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});