//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  navTo(e) {
    if(!wx.getStorageSync("user").phone){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      app.com.navTo(e)
    }
    
  },
  onLoad: function (options) {
    // wx.setNavigationBarColor({
    //   frontColor: '#000000',
    //   backgroundColor: '#ffffff',
    // })

    let type = ''
    let sid = ''
    if(options.scene){
      type='scan'
      sid = options.scene
    } else if (options.id){
      type='share'
      sid = options.id
    }
    this.login(type,sid)
  },
  login(type,sid){
    let formData = {
      type : type,
      sid:sid
    }
    wx.login({
      success(res) {
        formData.js_code = res.code
        app.com.post('wx/user/login', formData, function (res) {
          if (res.code == 1) {
            wx.setStorageSync("user", res.data)
          } else {
            wx.showToast({
              title: '失败',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  onShareAppMessage(){
    return {
      title:'一站式房贷管家为你服务',
      path:'/pages/index/index?wx_id='+wx.getStorageSync("user").id
    }
  }
 
})
