const mongoose = require('mongoose');

const wait = (ms) => new Promise((resolve,reject)=> setTimeout(() => resolve(),ms))

const dbconnect = async(url, retry, appID)=> {
  let connection;
  let connected = false;
  let count = 0;
  await wait(retry);
  while(!connected) {
    console.log('COUNT:', count, appID)
   connection = await mongoose.connect(url)
                      .then(db => {
                        return db
                      })
                      .catch(e => {
                      console.log('MONGO FAILED ==>',appID, e)
                      console.log(`Will try to reconnect in ${retry} miliseconds`)
                     });
    !connection ? await wait(retry) : connected = true;
    count++
  }
  console.log(appID,'DB Connection is NOW established.')
  return connection;
}

module.exports = {dbconnect}
