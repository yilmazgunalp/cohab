
const createConversation = (Conversation) => async(message) => {
  let between = setBetweenKey(message.from,message.to);
  let convo = await Conversation.findOne({between}) 
return convo ? convo.messages.push(message) : Conversation.create({between,messages: [message]}) 
}

const getConversations = Conversation => () => {
  return Conversation.find({}).populate({path: 'postedBy',select: 'username'});
}

const deleteConversation = Conversation => (message_id) => {
  return Conversation.deleteOne({_id: message_id}).exec();
}

module.exports = (Conversation,User) => {
  return {
    create: createConversation(Conversation),
    getAll: getConversations(Conversation,User),
    delete: deleteConversation(Conversation)
  }
} 

const setBetweenKey = (from,to) => {
    return [from,to].sort().join('_');
}
