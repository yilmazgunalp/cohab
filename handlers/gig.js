const EventEmitter = require('events');

class Gig extends EventEmitter {

    constructor(name,place) {
        super();
        this.name = name;
        this.place = place;
    }

    toString() {
        return `${this.name} happens at ${this.place}`
    }




};


const makeGig = (name,place) => {

    let gig = new Gig(name,place);
    gig.on('create',() => {setImmediate(()=> console.log("this event has been emitted now!!"))});
    gig.emit('create');
    console.log("this is after the EMIT event");
    return gig;
}

module.exports = makeGig;

