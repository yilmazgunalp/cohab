let {createReadStream } = require("fs");

const poll = (req,resp) => {
  let chance = Math.random() > 0.5;
  resp.end("writing from a  handler!!");
};

const home = (req,resp) => {
  createReadStream("./views/home.html").pipe(resp);
};

const  handlers = {
  "/poll": poll,
  "/": home

};

module.exports = function(path) {
  return handlers[path];
};


