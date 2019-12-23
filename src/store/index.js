import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: " This is a error message",
    user: {
      username: "小明"
    },
    reconnect: false,
    activeRoom: {
      id: "0",
      name: "群聊"
    },
    rooms: [
      {
        id: "0",
        name: "社会主义点餐群",
        members: ["Jack", "Jane", "Julia"],
        messages: [
          {
            username: "Jack",
            date: "2019年10月18日 10:00",
            text: "1111111"
          },
          {
            username: "Jane",
            date: "12/12/1644",
            text: "2019年10月18日 10:05"
          }
        ]
      },
      {
        id: "1",
        name: "社会主义福利群",
        members: ["Jack", "Jane", "Julia"],
        messages: [
          {
            username: "Jane",
            date: "12/12/1644",
            text: "3333333"
          }
        ]
      }
    ],
    users: [
      {
        username: "Jack"
      },
      {
        username: "Jane"
      },
      {
        username: "Julia"
      }
    ],
    messages: [
      {
        username: "Jack",
        date: "2019年10月18日 10:00",
        text: "社会主义好"
      },
      {
        username: "Jack",
        date: "2019年10月18日 10:05",
        text: "庆祝新中国70周年"
      },
      {
        username: "Jane",
        date: "2019年10月18日 10:08",
        text: "全面建设社会主义国家"
      }
    ]
  },
  mutations,
  actions,
  getters: {
    hasError: state => (state.error ? true : false)
  },
  plugins: [vuexLocal.plugin]
});
