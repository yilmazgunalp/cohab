const Event = require('./event');
const User = require('../user/user');
const util = require('../modules/util');
const EventService = require('./event.service')(Event,User);

exports.GET = {
getAll:        async(req,resp)=> {
                let events = await EventService.getAll();
                console.log(events);
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(events));
               }
}

exports.POST = {
create:        async(req,resp)=> {
               let event = await util.getBody(req).then(formdata => JSON.parse(formdata));
               EventService.create(event)
               .then(event => {
                 console.log("event saved succefully");
                 resp.end();
               })
               .catch(e => console.log(e));
               },

delete:        async(req,resp)=> {
               let event = await util.getBody(req).then(body => JSON.parse(body));
               EventService.delete(event._id)
               .then(event => {
                 resp.end();
               })
               .catch(e => console.log(e));
               }
}
