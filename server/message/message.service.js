
const createConversation = (Conversation) => async(message) => {
  let between = setBetweenKey(message.from,message.to);
  let convo = await Conversation.findOne({between}) 
return convo ? convo.messages.push(message) : Conversation.create({between,messages: [message]}) 
}

const getConversations = Conversation => (user) => {
  return Conversation.find({between: new RegExp(user)});
}

const deleteConversation = Conversation => (message_id) => {
  return Conversation.deleteOne({_id: message_id}).exec();
}

module.exports = (Conversation,User) => {
  return {
    create: createConversation(Conversation,User),
    getAll: getConversations(Conversation),
    delete: deleteConversation(Conversation)
  }
} 

const setBetweenKey = (from,to) => {
    return [from,to].sort().join('_');
}
