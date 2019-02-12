const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getOrder('order/get/liu',)
  },

  getOrder(){
    wx.showLoading({
      title: '加载中',
    })
    app.com.post('order/get/liu', {
      wheres: 'jjr_id=' + wx.getStorageSync("user").id,
      pageSize: 10000,
      pageIndex: 1
    }, function (res) {
      wx.hideLoading()
      if(res.code == 1){
        _this.setData({
          list:res.data.list
        })
      }
    })
  }
})