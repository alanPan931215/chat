<!-- 头部导航栏-->
<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand>趣聊</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.username }} |</b-nav-text>
      <b-nav-item href="" active>切换账号</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChatNavBar",
  computed: {
    ...mapState(["user"])
  }
};
</script>
