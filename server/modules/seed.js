const User = require('../user/user');

let users = [
  {username: 'shelly',email: 'shelly@test.com', active: true},
  {username: 'max',email: 'max@test.com', active: true},
  {username: 'ruby',email: 'ruby@test.com', active: true},
  {username: 'button',email: 'button@test.com', active: true},
  {username: 'flower',email: 'flower@test.com', active: true},
  {username: 'olaf',email: 'olaf@test.com', active: true},
  {username: 'beatrice',email: 'yilmazgunalp@gmail.com', active: true}
]

User.remove()
.then(()=> users.map(user => new User(user)))
.then(users => users.map(user => {
    user.setPassword('123456');
    user.save();
  }))
.then(()=> console.log('Database is seeded!...')) 


