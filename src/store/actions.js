// 显示错误信息
function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit("setError", message);
}

export default {
  // 发送信息
  async sendMessage({ commit }, message) {
    try {
      commit("setError", "");
      var now = new Date(); //当前日期
      var nowDay = now.getDate(); //当前日
      var nowMonth = now.getMonth() + 1; //当前月
      var nowYear = now.getFullYear(); //当前年
      var nowHour = now.getHours(); //当前时
      var nowMinute = now.getMinutes(); //当前分
      const messageId = {
        date:
          nowYear +
          "年" +
          nowMonth +
          "月" +
          nowDay +
          "日" +
          "  " +
          nowHour +
          ":" +
          nowMinute,
        text: message
      };
      commit("addMessage", messageId);
      return messageId;
    } catch (error) {
      handleError(commit, error);
    }
  },
  clearChatRoom({ commit }) {
    commit("clearChatRoom");
  }
};
