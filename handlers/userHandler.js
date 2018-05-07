const getUser = (req) => {
console.log(req.headers);
 //   if(!req.headers.cookie) return "no user";
   return helper.cookiesToJson(req.headers["cookie"]).user;
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

module.exports = (url)=> {
        
        console.log(url);
    };
