<template>
  <div class="room-list">
    <h5></h5>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search_box">
        <input
          class="search_input form-control"
          v-model="searchValue"
          @input="searchInput"
          @focus="inputFocus"
          @blur="inputBlur"
          type="text"
          placeholder="搜索"
        />
        <el-button @click="clearSearch" v-if="showClear" type="text"
          >取消</el-button
        >
      </div>
    </div>
    <!-- 群聊、好友、新建群聊三个窗口切换 -->
    <div id="switchModel" accordion>
      <div class="button" @click="activeButton1">
        <i type="primary" class="el-icon-menu"></i>
      </div>
      <div class="button" @click="activeButton2">
        <i type="primary" class="el-icon-s-custom"></i>
      </div>
      <div class="button">
        <i
          type="primary"
          class="el-icon-circle-plus"
          @click="activeButton3"
        ></i>
      </div>
    </div>

    <!-- 功能一 会话列表（默认） -->

    <div v-if="showRooms">
      <b-list-group v-if="activeArea1">
        <div>会话</div>
        <b-list-group-item
          class="style-one"
          v-for="room in rooms"
          :key="room.name"
          :active="activeRoom.id === room.id"
          href="#"
          @click="onChange(room)"
          ># {{ room.name }}</b-list-group-item
        >
      </b-list-group>

      <!-- 功能二 好友列表 -->
      <b-list-group v-if="activeArea2">
        <div>好友</div>
        <b-list-group-item
          class="style-one"
          v-for="user in users"
          :active="false"
          :key="user.index"
          href="#"
          @click="chatPerson(user)"
          >{{ user.username }}</b-list-group-item
        >
      </b-list-group>

      <!-- 功能三 新建会话 -->
      <div v-if="activeArea3">新建会话</div>
      <div v-for="(user, index) in users" :key="index">
        <button
          v-if="activeArea3"
          class="style-two"
          href="#"
          @click="adduser(index)"
        >
          {{ user.username }}
        </button>
      </div>
      <button v-if="activeArea3" @click="addChat()" class="style-three">
        建立群聊
      </button>
      <div></div>
      <span v-for="(item, index) in userlist" :key="index">
        {{ item }}
      </span>
    </div>
    <!-- 搜索会话列表 -->
    <b-list-group v-show="showArr">
      <div v-for="room in arr" :key="room.id" @click="toDetails(room.id)">
        {{ room.name }}
      </div>
    </b-list-group>
    <div class="notMatch_box" v-if="showMsg">
      <div>请输入查找的内容</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomList",
  data() {
    return {
      roomList: "",
      showClear: false, //显示删除图标
      showRooms: true, //显示会话列表
      showArr: false, //显示搜索列表
      searchValue: null, //搜索的内容
      showMsg: false, //搜索辅助信息
      arr: [], //搜索所得内容
      userlist: [], // 添加会话成员
      activeArea1: true, //会话窗口
      activeArea2: false, //好友窗口
      activeArea3: false, //新增会话窗口
      selected: true //切换选择样式
    };
  },
  computed: {
    ...mapState(["rooms", "activeRoom", "users"])
  },
  methods: {
    ...mapActions(["changeRoom", "clearChatRoom"]),

    /*
      以下为会话切换功能
    */

    //会话窗口内部切换
    onChange(room) {
      this.activeRoom.id = room.id;
      this.activeRoom.name = this.rooms[this.activeRoom.id].name;
      this.clearChatRoom();
    },
    //好友窗口切换会话窗口
    chatPerson(user) {
      let that = this;
      for (const room of that.rooms) {
        if (user.username === room.name) {
          that.activeRoom.name = room.name;
          that.activeRoom.id = room.id;
          that.activeButton1();
          return;
        }
      }
      const newroom = {
        id: that.rooms.length.toString(),
        name: user.username,
        members: [user.username],
        messages: []
      };
      that.rooms.push(newroom);
      that.activeRoom.id = newroom.id;
      that.activeRoom.name = that.rooms[that.activeRoom.id].name;
      that.activeButton1();
      that.clearChatRoom();
    },

    //搜索的会话切换到会话窗口
    toDetails(id) {
      console.log(id);
      this.clearSearch();
      this.activeRoom.id = id;
    },
    activeButton1() {
      this.activeArea1 = true;
      this.activeArea2 = false;
      this.activeArea3 = false;
    },
    activeButton2() {
      this.activeArea1 = false;
      this.activeArea2 = true;
      this.activeArea3 = false;
    },
    activeButton3() {
      this.activeArea1 = false;
      this.activeArea2 = false;
      this.activeArea3 = true;
    },

    /*
    以下为新建群聊功能
    */
    adduser(index) {
      let that = this;
      that.i = index;
      console.log(index);
      let chooseName = that.users[index].username;
      if (that.isInArray(that.userlist, chooseName)) {
        that.delFromArray(that.userlist, chooseName);
      } else {
        that.userlist.push(chooseName);
        console.log(that.userlist);
      }
    },
    isInArray(array, value) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (value === element) {
          return true;
        }
      }
    },
    delFromArray(array, value) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (value === element) {
          array.splice(index, 1);
        }
      }
    },
    //新增会话
    addChat() {
      let that = this;
      const len = that.userlist.length;
      console.log(len);
      if (len > 0) {
        let str = "";
        that.userlist.forEach(element => {
          str += "," + element;
        });
        let newChat = {
          id: that.rooms.length,
          name: str.substr(1),
          members: that.userlist,
          messages: []
        };
        that.rooms.push(newChat);
        that.userlist = [];
        that.activeButton1();
        that.activeRoom.name = str;
        that.activeRoom.id = that.rooms.length - 1;
        console.log(that.activeRoom.id);
      }
    },

    /*
     以下为搜索框逻辑
     */

    //搜索功能
    searchInput() {
      this.arr = [];
      this.showMsg = false;
      this.showClear = true;
      let val = this.searchValue;
      for (let i of this.rooms) {
        if (i.name.indexOf(val) >= 0) {
          this.arr.push(i);
        }
      }
    },

    //失去焦点事件
    inputBlur() {
      console.log("失去焦点事件");
    },

    //获得焦点事件
    inputFocus() {
      this.showClear = true;
      this.showRooms = false;
      this.showArr = true;
      this.showMsg = true;
      console.log("获得焦点事件");
    },

    //清除搜索内容
    clearSearch() {
      this.searchValue = "";
      this.showRooms = true;
      this.showArr = false;
      this.showMsg = false;
      this.arr = [];
      this.showClear = false;
    }
  }
};
</script>
<style>
/* 图标 */
#switchModel {
  font-size: 120px;
}
.button {
  display: inline-block;
  width: 33.3%;
}
.button:hover {
  background: #b9d1f6;
  cursor: pointer;
}
/*
  以下为搜索功能样式
*/
.search {
  display: flex;
  padding: 20px 30px;
}
.search_box {
  display: flex;
  position: relative;
  border: solid 1px #ddd;
  border-radius: 20px;
}
.searchicon {
  position: absolute;
  background: transparent;
  margin-top: 11px;
  margin-left: 15px;
}

.clearicon {
  background: transparent;
  margin-top: 11px;
  margin-right: 15px;
  float: right;
}

.search_input {
  height: 60px;
  line-height: 60px;
  border-radius: 20px;
  border: none;
  outline: none;
  padding-left: 70px;
  margin-right: 30px;
}

.notMatch_box {
  padding-top: 45px;
  text-align: center;
}

/* 群聊、好友样式 */
.style-one {
  border: 2px solid #37393b;
  margin-top: 20px;
  line-height: 100px;
  padding: 20px 180px;
  border-radius: 5%;
}

/* 新增群聊样式 */

.style-two,
.gray {
  border: 1px solid #ced4da;
  margin-top: 20px;
  height: 200px;
  width: 100%;
  line-height: 100px;
  padding: 20px 50px;
  background-color: #6c75cd;
}
.gray {
  background-color: #6c757d;
}
.style-three {
  border: 2px solid #c5cdd4;
  line-height: 100px;
  padding: 20px 180px;
  border-radius: 5%;
}
.el-checkbox__inner {
  width: 50px;
  height: 50px;
}
.style-box {
  float: left;
}
</style>
