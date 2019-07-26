// Probably dont need User Model:)
const createConversation = (Conversation) => async(message) => {
  let between = setBetweenKey(message.from,message.to);
  let convo = await Conversation.findOne({between})
  if(convo){
  convo.messages.push(message) 
    return convo
  }
return Conversation.create({between,messages: [message]}) 
}

const getConversations = Conversation => (user) => {
  return user ? Conversation.find({between: new RegExp(user)})
                : null
}

const deleteConversation = Conversation => (message_id) => {
  //TODO
}

module.exports = (Conversation,User) => {
  return {
    create: createConversation(Conversation),
    getAll: getConversations(Conversation),
    delete: deleteConversation(Conversation)
  }
} 

const setBetweenKey = (from,to) => {
    return [from,to].sort().join('_').toLowerCase();
}
