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
        wx.hideLoading()
        if (res.statusCode === 200) {
          
          wx.saveImageToPhotosAlbum({
            filePath:res.tempFilePath,
            success(res) {
              console.log(res)
            },fail(res){
              console.log(res)
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                },
                fail(res){
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  }
  
})