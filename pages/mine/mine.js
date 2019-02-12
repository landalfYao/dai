const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  makephonecall(){
    wx.makePhoneCall({
      phoneNumber: '111',
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
    if (!wx.getStorageSync("user").phone) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  
})