const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:1
  },
  makephonecall(){
    wx.makePhoneCall({
      phoneNumber: wx.getStorageSync("user").dh,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getINfo()
  },
  getINfo(){
    app.com.post('agent/get/id', {
      wx_id: wx.getStorageSync("user").id
    }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        wx.setStorageSync("qrcode", res.data.qrcode)
        _this.setData({
          msg:res.data
        })
      }
    })
  },
  navTo(e) {
    app.com.navTo(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    _this.setData({
      showPage: wx.getStorageSync("user").showPage ,
      dh: wx.getStorageSync("user").dh
    })
    if (!wx.getStorageSync("user").phone) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } 
  },

  location(){
    wx.openLocation({
      latitude: 30.312970,
      longitude: 120.066560,
      name:'杭州艾登商务信息咨询有限公司',
      address:'杭州市西湖区西港发展中西8幢1004'
    })
  }


  
})