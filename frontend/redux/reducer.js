const reducer = (state={user: null},action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return Object.assign({},state,{user: null})
    case 'LOG_IN':
      return Object.assign({},state,{user: action.user})
    default:
      return state
    }
}

export default reducer;
