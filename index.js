const {createServer} = require("http");
const router = require("./router");
let {createReadStream } = require("fs");

createServer((req,resp) => {

let {params,handler} = router(req);

if(!handler) {
  resp.writeHead(404);
  createReadStream("./views/404.html").pipe(resp);
} else {
  handler(req,resp);  
}  
  
}).listen(8000);

console.log(`Cohab started listening on port 8000`);
