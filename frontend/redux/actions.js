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
