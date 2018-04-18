let {createReadStream,createWriteStream,writeFile,open,write } = require("fs");
const helper = require("./helper");
const {parse, URLSearchParams} = require("url");

const makeGig = require("./gig");

//this needs to be in DB
let db = [{note: "Romina"}];
let version = 0;
//this needs to go to another file.. Server??
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

const getUser = (req) => {
   return helper.cookiesToJson(req.headers["cookie"]).user;
}

const home = (req,resp) => {
    let user = getUser(req);
    console.log(user);
  createReadStream("./views/home.html").pipe(resp);
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

const signup = (req,resp) => {
   let data = createWriteStream("./users.json",{flags: "a+"});  
    helper.getBody(req).then(formdata => {
  data.write((JSON.stringify(helper.formToJson(formdata)) + "\n"));
  data.end();
  data.on("finish", () => resp.end("user signed up!!"));
  });
    };

const login = (req,resp) => {
    helper.getBody(req).then((formdata) => {
    let user =  helper.formToJson(formdata);
    find(user).then(usr => {
    if(usr) {
    resp.writeHead(200,{"Set-Cookie": [`user=${user.username},sessionid=123`]});
    resp.end(`user: ${user.username} logged in with password: ${user.pswd}`);
   }
 resp.end(`user not found!!`);
});    
}).catch(e => console.log(e));
}

const find = async(user) => {
    let result;
    await helper.fileToJson().then(data => {
   result =  data.filter(e => e.username == user.username && e.pswd == user.pswd)[0];
    });
return result;
}


const gig = (req,resp) => {
    //create an event object
    let gig = makeGig("party","cavendish");
    console.log(gig.toString());
   let data = createWriteStream("./users.json",{flags: "a+"});  
    helper.getBody(req).then(formdata => {
  data.write((JSON.stringify(helper.formToJson(formdata)) + "\n"));
  data.end();
  data.on("finish", () => resp.end("event created!"));
  });
 


}

const  handlers = {
  "/poll": poll,
  "/": home,
  "/add": add,
  "/signup": signup,
  "/login": login,
  "/secret": home,
    "/event": gig
};

module.exports = function(path) {
  return handlers[path];
};


