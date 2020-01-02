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
// 异步修改state的数据
// 存放公共的请求函数,并且该函数可能会修改state的数据(不一定要修改)
export const actions = {
  //登录
  login({commit}, data) {
    return this.$axios({
      method: 'POST',
      url: '/accounts/login',
      data
    }).then(res => {
      this.$router.back()
      commit('setUserInfo', res.data)
    })
  },
  // 发送手机验证码
  sendCaptcha(state, data) {
    return this.$axios({
      method: "POST",
      url: "/captchas",
      data: {
        tel: data
      }
    })
  },
  //注册
  enroll({commit}, data) {
    return this.$axios({
      method: "POST",
      url: "/accounts/register",
      data
    }).then(res=>{
      this.$router.back()
      commit('setUserInfo',res.data)
    })
  }
};
