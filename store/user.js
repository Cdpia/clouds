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
  // 修改userInfo
  setUserInfo(state, data) {
    state.userInfo = data
  },
  cleanUserInfo(state, info) {
    if (process.browser) {
      localStorage.removeItem("userInfo");
    }
    state.userInfo = {};
  }
};
// 异步修改stase的数据
// 存放公共的请求函数,并且该函数可能会修改steta的数据(不一定要修改)
export const actions = {
  // 登录
  // login({commit}, data) {
  //   return this.$axios({
  //     url: "/accounts/login",
  //     method: "POST",
  //     data: data
  //   }).then(res => {
  //     const data = res.data;
  //     // 保存到state
  //     commit("setUserInfo", data);
  //     return data;
  //   })
  // }
  login({commit},data){
    return this.$axios({
      method:'POST',
      url:'/accounts/login',
      data
    }).then(res=>{
      this.$router.back()
      commit('setUserInfo',res.data)

    })
  }

  // login(store,data) {
  //   console.log(store);
  //   this.$axios({
  //     method: 'POST',
  //     url: '/accounts/login',
  //     data
  //   }).then(res => {
  //     this.$router.back()
  //     store.commit('setUserInfo',res.data)
  //   })
  // }
};
