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
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    if(!wx.getStorageSync("g")){
      // wx.redirectTo({
      //   url: '/pages/guide/guide',
      // })
    }else{
      wx.removeStorageSync("g")
    }
  },
  onShareAppMessage(){
    return {
      title:'一站式房贷管家为你服务',
      path:'/pages/index/index'
    }
  }
 
})
