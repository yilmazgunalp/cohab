
let waiting = [];
const poll = (req,resp) => {
	resp.setHeader("Content-Type", "application/json");
  if(req.headers["if-none-match"] != version) {
  	resp.setHeader("ETag", version);
	resp.end(JSON.stringify(db));
  } else {
	//add request to waiting list
	let tmp = {req,resp};
	waiting.push(tmp);
	setTimeout(()=> {
	//if request is still in the waiting list send 304
	//and remove the request from waiting list
		if (waiting.includes(tmp)) {
  		resp.writeHead(304);
		waiting = waiting.filter(e => e != tmp);
  		resp.end();
		}
	//else do nothing
  	},27000)
  }
};


const add = (req,resp) => {
	helper.getBody(req).then(formdata => {
	let params = new URLSearchParams(formdata);
	db.push({note: params.get("note")});
	version++;
	//send message to all waiting requests to update
	update();	
	resp.end();
	});
};

//this needs to go to another file.. Server??
const update = () => {
	waiting.forEach(({req,resp}) => {
		resp.setHeader("ETag", version);
		resp.end(JSON.stringify(db));
});
waiting = [];
}


