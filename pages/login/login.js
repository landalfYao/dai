let app = getApp();
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _this = this
    wx.setStorageSync("bb", true)
  },
  phoneinput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 授权登录
   */
  authorLogin: function(e) {
    let _this = this;
    if (this.data.phone == '' && this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入11位手机号',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '登录中',
        mask:true
      })
      // 执行微信登录
      wx.login({
        success: function(res) {
          // 发送用户信息
          let form = e.detail.userInfo
          form.phone = _this.data.phone
          form.id = wx.getStorageSync("user").id
          app.com.post('wx/user/update', form, function(res) {
            // 记录token user_id
            wx.hideLoading()
            wx.setStorageSync('user', res.data);
            // 跳转回原页面
            _this.navigateBack();
          }, false, function() {
            wx.hideLoading();
          });
        },
        fali(res) {
          _this.navigateBack();
        }


      })

    }

  },

  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function() {
    wx.navigateBack();
    // let currentPage = wx.getStorageSync('currentPage');
    // wx.redirectTo({
    //   url: '/' + currentPage.route + '?' + App.urlEncode(currentPage.options)
    // });
  },

})