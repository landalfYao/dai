const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },
  phoneInput(e){
    this.setData({
      phone:e.detail.value
    })
  },
  submit(){
    app.com.post('wx/user/update/phone', {
      phone:this.data.phone,
      id:wx.getStorageSync("user").id
    }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        wx.showToast({
          title: '修改成功'
        })
        setTimeout(function(){
          wx.navigateBack({
            detla: 1
          })
        },800)
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})