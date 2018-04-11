let {createReadStream } = require("fs");
const helper = require("./helper");
const {parse, URLSearchParams} = require("url");

let db = [{note: "Romina"}];
let version = 0;

const poll = (req,resp) => {
   console.log(version,"version");
   console.log(req.headers["if-none-match"],"ifnone"); 
   console.log(req.headers["if-none-match"] == version);
    
  if(req.headers["if-none-match"] != version) {
  	resp.setHeader("ETag", version);
  	resp.end(db.toString());

  } else {

  	setTimeout(()=> {
  		resp.writeHead(304);
  		resp.end();

  	},10000)


  }


};

const home = (req,resp) => {
  createReadStream("./views/home.html").pipe(resp);
};

const add = (req,resp) => {
	helper.getBody(req).then(formdata => {
	let params = new URLSearchParams(formdata);
	db.push({note: params.get("note")});
	version++;
	resp.end(db.toString());
	});
};


const  handlers = {
  "/poll": poll,
  "/": home,
  "/add": add

};

module.exports = function(path) {
  return handlers[path];
};


