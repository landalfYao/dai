const app = getApp()
let _this;
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
    _this = this;
    this.setData({
      id:options.id
    })
    this.getNews()
  },
  getNews() {
    app.com.post('news/get', {
      pageIndex: 1,
      pageSize: 50,
      wheres: 'is_delete=0 and id='+this.data.id,
      sorts: 'create_time desc'
    }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        let arr = []
        arr = res.data.list
        arr[0].content = arr[0].content.replace(RegExp("<img", "g"), "<img width='100%'");
        _this.setData({
          news: arr[0],
        })
      }
    })
  },
  
})