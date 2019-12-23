export default {
  //错误信息提示
  setError(state, error) {
    state.error = error;
  },
  //操作用户数据
  setUser(state, user) {
    state.user = user;
  },
  //操作好友数据
  setUsers(state, users) {
    state.users = users;
  },
  addUsers(state, users) {
    state.users.push(users);
  },
  //操作当前会话
  setActiveRoom(state, roomId) {
    state.activeRoom = roomId;
  },
  //操作会话列表
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  //清空记录
  clearChatRoom(state) {
    // state.users = [];
    state.messages = [];
  },
  //操作会话内容
  setMessages(state, messages) {
    state.messages = messages;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
  //退出账户
  reset(state) {
    state.error = null;
    state.users = [];
    state.messages = [];
    state.rooms = [];
    state.user = null;
  }
};
