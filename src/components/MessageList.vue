<!--会话列表-->
<template>
  <div class="message-list">
    <div class="message-title">{{ activeRoom.name }}</div>
    <div class="message-group" ref="viewBox">
      <div class="message" v-for="(message, index) in messages" :key="index">
        <div class="message-text">{{ message.date }}</div>
        <div class="clearfix"></div>
        <div class="float-right">
          <img class="imgStyle" src="../assets/logo.png" />
        </div>
        <div class="clearfix">
          <small class="float-right shadow">{{ message.text }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Bus from "../store/Bus.js";

export default {
  data() {
    return {
      addPic: false
    };
  },
  name: "message-list",
  computed: {
    ...mapState(["rooms", "messages", "activeRoom"])
  },
  //输入信息scroll框自动拉到底部
  created() {
    this.activeRoom.name = this.rooms[this.activeRoom.id].name;
    Bus.$on("msg", () => {
      this.$refs.viewBox.scrollTop = this.$refs.viewBox.scrollHeight;
    });
  }
};
</script>

<style>
.message-list {
  margin-bottom: 15px;
  padding-right: 15px;
  border-bottom: 1px solid #bdc0c4;
}
.message-title {
  font-size: 14px;
  border-bottom: 1px solid #bdc0c4;
}
.message-group {
  height: 65vh !important;
  overflow-y: auto;
}
.message {
  border: 1px solid lightblue;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}
.message-text {
  color: gray;
  margin-bottom: 0;
}
.imgStyle {
  width: 200px;
  height: 200px;
}
</style>
