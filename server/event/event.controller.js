const Event = require('./event');
const util = require('../modules/util');
const EventService = require('./event.service')(Event);

exports.GET = {
getAll:        async(req,resp)=> {
                let events = await EventService.getAll();
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(events));
               }
}

exports.POST = {
create:        async(req,resp)=> {
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify
                ({"event": "Hello brand new event"}));
               }
}
