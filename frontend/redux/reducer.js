const reducer = (state={user: null,modal: {show: 0},renderInbox: 0},action) => {
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
    case 'SAVE_CONVERSATIONS':
      return Object.assign({},state,{socket: action.socket})
    default:
      return state
    }
}

export default reducer;
