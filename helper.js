// retrieves the body of a request. Asynchronous so has to be 'then'ed with a callback
const getBody = async function(req) {
	let data = "";
	return  await new Promise(resolve => {
		req.on("data",chunk => data += chunk);
	 	req.on("end",() => resolve(data));  
	});
} 


module.exports = {getBody};
