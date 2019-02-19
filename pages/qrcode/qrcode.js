const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      qrcode: wx.getStorageSync("qrcode")
    })
  },
  saveqr(){
    wx.showLoading({
      title: '保存中',
    })
    wx.downloadFile({
      url: wx.getStorageSync("qrcode"), // 仅为示例，并非真实的资源
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          wx.hideLoading()
          wx.saveImageToPhotosAlbum({
            filePath:res.tempFilePath,
            success(res) { }
          })
        }
      }
    })
  }
  
})