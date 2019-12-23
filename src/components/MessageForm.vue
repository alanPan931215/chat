<template>
  <div class="message-form ld-over">
    <el-form class="ld-over">
      <div class="flex">
        <!-- 图片上传-->
        <el-upload
          class="upload-demo"
          color="white"
          action=""
          multiple
          :limit="9"
        >
          <el-button
            icon="el-icon-picture"
            @click="sendPic"
            id="pic-Button"
          ></el-button>
        </el-upload>

        <!-- 信息输入-->
        <textarea
          class="form-control"
          type="text"
          id="inputArea"
          v-model="message"
          placeholder="Enter Message"
          autocomplete="off"
          @keyup="searchInput($event)"
          required
        />
      </div>

      <!-- @功能实现-->
      <div v-if="findUser" id="users-Div">
        <div
          v-for="(user, index) in users"
          @click="onSelect(index)"
          :key="user.index"
          id="user-Div"
        >
          <span class="callSomeone">{{ user.username }}</span>
        </div>
      </div>
      <!-- send按钮-->
      <div id="send-button">
        <el-button @click="onSubmit" type="primary" round id="button-inside"
          >发送</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Bus from "../store/Bus.js";

export default {
  name: "message-form",
  data() {
    return {
      message: "",
      findUser: false,
      fileList: []
    };
  },
  computed: {
    ...mapState(["user", "users"])
  },

  watch: {
    //监听input内容，实现@功能
    message(msg) {
      if (msg.charAt(msg.length - 1) === "@") {
        console.log(this.users);
        this.findUser = true;
      } else {
        this.findUser = false;
      }
    }
  },

  //利用bus传递兄弟组件信息
  methods: {
    ...mapActions(["sendMessage"]),
    //选择@人员
    onSelect(index) {
      console.log(index);

      this.message += this.users[index].username;
      this.findUser = false;
    },
    //发送信息
    async onSubmit() {
      if (this.message != "") {
        const result = await this.sendMessage(this.message);
        if (result) {
          this.message = "";
        }
        Bus.$emit("msg", "scrollbottom");
      }
    },

    //监听内容输入
    searchInput(e) {
      console.log("111111", e);
    },
    //处理图片
    sendPic() {}
  }
};
</script>
<style>
#pic-Button {
  font-size: 150px;
  margin: 30px 50px 50px 50px;
  border-radius: 15px;
}

#inputArea {
  height: 320px;
  margin-left: 60px;
}

#users-Div {
  border-bottom: 1px solid black;
  z-index: 100;
  position: fixed;
  width: 400px;
  height: auto;
  bottom: 530px;
  opacity: 0.7;
  left: 55%;
}

#user-Div {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: 400px;
  height: 160px;
  text-align: center;
  margin: auto;
  background-color: #20c997;
  color: black;
}
#send-button {
  height: 150px;
}
#button-inside {
  padding: 40px 500px;
}
.callSomeone {
  padding-bottom: 40px;
}
#users-Div:hover {
  cursor: pointer;
  background: #007bff;
}
</style>
