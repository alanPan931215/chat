<template>
  <el-container class="chat-dashboard">
    <ChatNavBar />
    <el-header height="0"></el-header>
    <el-container class="chat-margin">
      <el-aside width="20%"><RoomList /></el-aside>
      <el-container>
        <el-main><MessageList /><MessageForm /></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import ChatNavBar from "@/components/ChatNavBar.vue";
import RoomList from "@/components/RoomList.vue";
import MessageList from "@/components/MessageList.vue";
import MessageForm from "@/components/MessageForm.vue";

export default {
  name: "Chat",
  components: {
    ChatNavBar,
    RoomList,
    MessageList,
    MessageForm
  }
};
</script>
<style>
.chat-dashboard {
  background-color: #787d81;
}

.chat-margin {
  margin: 0 10%;
}
</style>
