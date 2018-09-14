const User = require('../user/user');
const config = require('../config/config');
const Event = require('../event/event');

let users = [
  {username: 'shelly',email: 'shelly@test.com', active: true},
  {username: 'max',email: 'max@test.com', active: true},
  {username: 'ruby',email: 'ruby@test.com', active: true},
  {username: 'button',email: 'button@test.com', active: true},
  {username: 'flower',email: 'flower@test.com', active: true},
  {username: 'olaf',email: 'olaf@test.com', active: true},
  {username: 'beatrice',email: 'yyilmazgunalp@gmail.com', active: true}
]
const seed = async() => {
await User.remove();
await User.insertMany(users.map(user => new User(user)).map(user => {user.setPassword('123456');return user}));
}

seed().then(()=> console.log('Database is seeded!...'))
.then(()=> User.findOne({username: 'olaf'}))
.then(user => {
  Event.create({name: 'first event',organizer: 'baba',postedBy: user})
  .then(e => console.log(e))
});

