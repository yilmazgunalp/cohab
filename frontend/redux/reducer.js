const reducer = (state={user: null,modal: {show: 0},renderInbox: 0,conversations: new Map(),unreadMessages: new Set()},action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return Object.assign({},state,{user: null})
    case 'LOG_IN':
      return Object.assign({},state,{user: action.user})
    case 'SHOW_MODAL':
      return Object.assign({},state,{modal: action.modal})
    case 'HIDE_MODAL':
      return Object.assign({},state,{modal: action.modal})
    case 'RENDER_INBOX':
      return Object.assign({},state,{renderInbox: !state.renderInbox})
    case 'CREATE_SOCKET':
      return Object.assign({},state,{socket: action.socket})
    case 'NEW_MESSAGE':
      return updateConversations(state,action.message);
    case 'ADD_MESSAGE':
      return addNewMessage(state,action.message);
    case 'MESSAGE_READ':
      return updateUnreaMessages(state,action.from);
    case 'INITIALIZE_INBOX':
      return Object.assign({},state,{conversations: action.conversations})
    default:
      return state
    }
}


  const updateConversations = (state,message) => {
    let conversation = state.conversations.get(message.from);
    if(conversation){
      let tempconversations = state.conversations.set(message.from,{messages: state.conversations.get(message.from).messages.concat([message])})
      return Object.assign({},state,{conversations: tempconversations,unreadMessages: checkUnreaMessages(state,message)})
    } else {
      let tempconversations = state.conversations.set(message.from,{messages: [message]})
      return Object.assign({},state,{conversations: tempconversations,unreadMessages: checkUnreaMessages(state,message)})
    }
}

  const checkUnreaMessages = (state,message) => {
   return state.unreadMessages.has(message.from) ? state.unreadMessages : state.unreadMessages.add(message.from);
  }


  const updateUnreaMessages = (state,from) => {
   if(state.unreadMessages.has(from)) {
     state.unreadMessages.delete(from);
     return Object.assign({},state,{unreadMessages: state.unreadMessages})
   } else {
     return Object.assign({},state)
   } 
  }

  const addNewMessage = (state,message) => {
    let conversation = state.conversations.get(message.to);
    if(conversation){
      let tempconversations = state.conversations.set(message.to,{messages: state.conversations.get(message.to).messages.concat([message])})
      return Object.assign({},state,{conversations: tempconversations,recievedNewMessage: true})
    } else {
      let tempconversations = state.conversations.set(message.to,{messages: [message]})
      return Object.assign({},state,{conversations: tempconversations})
    }
     
  }
export default reducer;
