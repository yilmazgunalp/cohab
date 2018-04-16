
let {createReadStream,createWriteStream,writeFile,open,write } = require("fs");


// retrieves the body of a request. Asynchronous so has to be 'then'ed with a callback
const getBody = async function(req) {
	let data = "";
	return  await new Promise(resolve => {
		req.on("data",chunk => data += chunk);
	 	req.on("end",() => resolve(data));  
	});
} 

//converts post form data to JSON
const formToJson = (formdata) => {
    let result = {}; 
    formdata.split("&").forEach(e => {
        let [k,v] = e.split("=");
        result[k] = v;
    });
return result;
};

const cookiesToJson = (cookies) => {
    let result = {}; 
    cookies.split(",").forEach(e => {
        let [k,v] = e.split("=");
        result[k] = v;
    });
return result;
}

//reads file and converts to JSON
const fileToJson = () => {
	return new Promise(resolve => {  
	let usersFile = createReadStream("./users.json");
	let users = "";
	usersFile.on("data",chunk =>  users += chunk);
		usersFile.on("end", () => {
        let result = JSON.parse(("["+ users.replace(/\n/g,",").slice(0,-1) + "]")); 
	resolve(result);  
		});
	});  
};







module.exports = {getBody,formToJson, fileToJson,cookiesToJson};

