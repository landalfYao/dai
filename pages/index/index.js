//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    showPage:1,
    list:[]
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
  sousuo(e){
    wx.showLoading({
      title: '查询中',
      task:true
    })
    app.com.post('order/get', {
      pageIndex: 1,
      pageSize: 10,
      wheres: 'orders.is_delete =0 and orders.title like "%' + e.detail.value +'%"' ,
      sorts: 'orders.create_time desc'
    }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        let arr = []
        arr = res.data.list
        _this.setData({
          list: arr,
          total: res.data.total
        })
      }
    })
  },
  onLoad: function (options) {
    
    _this = this
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
            _this.setData({
              showPage: res.data.showPage 
            })
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
