const User = require('../user/user');
const config = require('../config/config');
const Event = require('../event/event');
const Conversation = require('../message/message');

let users = [
  {username: 'shelly',email: 'shelly@test.com', active: true},
  {username: 'max',email: 'max@test.com', active: true},
  {username: 'ruby',email: 'ruby@test.com', active: true},
  {username: 'button',email: 'button@test.com', active: true},
  {username: 'flower',email: 'flower@test.com', active: true},
  {username: 'olaf',email: 'olaf@test.com', active: true},
  {username: 'beatrice',email: 'yyilmazgunalp@gmail.com', active: true},
  {username: 'carmeil',email: 'carmeil@test.com', active: true},
  {username: 'fedji',email: 'fedji@test.com', active: true},
  {username: 'moonshine',email: 'moonshine@test.com', active: true}
]
const seedusers = async() => {
  await User.remove();
  return await User.insertMany(users.map(user => new User(user)).map(user => {user.setPassword('123456');return user}));
}

const seedevents = async(users) => {
  let description =  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  let places = ['Newtown', 'Stanmore','Enmore','Redfern', 'Marrickvillel','Petersham','Lewisham','Antartica','Bowral','Gold Coast'];
  await Event.remove();
  let promises =  users.map((user,i)=>{
   return Event.create({name:`Event-${i}`,organizer: 'baba',place: places[i], 
   startTime: (new Date(`October 2${i}, 2018 1${i}:00`)),
   endTime: (new Date(`November 2${i}, 2018 1${i}:00`)) , postedBy: user,description,placeID: 'someID'})
   });
  return Promise.all(promises);
}

const seedmessages = async() => {
  await Conversation.remove();
}

seedusers()
.then(seedevents)
.then(() => seedmessages())
.then(()=> console.log('DATABASE IS SEEDED WITH 7 USERS AND 7 EVENTS'))
.catch(e => console.log(e));
