let { createReadStream,createWriteStream,writeFile,open,write } = require("fs");

const { getBody,formToJson, fileToJson} = require("../modules/helper");
const helper = require("../modules/helper");
const {URL,parse, URLSearchParams} = require("url");
const makeGig = require("../handlers/gig");
const redis = require('redis').createClient('redis://redis');

const base = 'http://localhost:5000';
const home = (req,resp) => {
  createReadStream("./views/home.html").pipe(resp);
};

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
//  "/poll": poll,
  "/": home,
 // "/add": add,
  "/secret": home,
    "/event": gig
};

module.exports = function(path) {
  if(path === '/') return home;
    let url = new URL(base+path);
    return require('./'+helper.basePath(path)+'Handler')(url);
};


