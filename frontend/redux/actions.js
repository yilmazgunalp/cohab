export const logout = () => ({
  type: 'LOG_OUT'
  });

export const login = (user) => ({
  type: 'LOG_IN',
  user
  });

export const showModal = ({show,onClose,content}) => ({
  type: 'SHOW_MODAL',
  modal: {show,content}
  });

export const hideModal = () => ({
  type: 'HIDE_MODAL',
  modal: {show: 0}
  });

export const renderInbox = () => ({
  type: 'RENDER_INBOX'
  });

export const createSocket = (socket) => ({
  type: 'CREATE_SOCKET',
  socket
  });

export const newMessage = (message) => ({
  type: 'NEW_MESSAGE',
  message
  });

export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message
  });

export const readMessage = (from) => ({
  type: 'MESSAGE_READ',
  from
  });

export const initializeInbox = (from) => ({
  type: 'INITIALIZE_INBOX',
  conversations
  });
