// 用户管理
export const state = () => ({
  // 登录后的数据,账号密码和token
  userInfo: {
    token: "",
    user: {},
  },
})
// 同步修改state的数据
export const mutations = {
    setUserInfo(state,data){
        state.userInfo = data
    },
    cleanUserInfo(state,info){
        if(process.browser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo = {};
    }
};
// 异步修改stase的数据
export const actions = {
  // 登录
  login({
    commit
  }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data: data
    }).then(res => {
      const data = res.data;
      // 保存到state
      commit("setUserInfo", data);
      return data;
    })
  }
};
