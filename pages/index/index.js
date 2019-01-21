//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  navTo(e) {
    app.com.navTo(e)
  },
  onLoad: function () {
    
  },
  onShareAppMessage(){
    return {
      title:'一站式房贷管家为你服务',
      path:'/pages/index/index'
    }
  }
 
})
