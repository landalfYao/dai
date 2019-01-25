const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    total:0,
    pageSize:10,
    pageIndex:1
  },
  navdetail(e){
    wx.navigateTo({
      url: '/pages/recode/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getMsg(0)
  },
  getMsg(type){
    if (type == 0) {
      this.data.pageIndex = 1
    } else {
      this.data.pageIndex += 1
    }
    wx.showLoading({
      title: '加载中',
    })
    app.com.post('order/get',{
      pageIndex:this.data.pageIndex,
      pageSize:this.data.pageSize,
      wheres:'orders.is_delete =0 and orders.wx_id ='+wx.getStorageSync("user").id,
      sorts:'orders.create_time desc'
    },function(res){
      wx.stopPullDownRefresh()
      wx.hideLoading()
      if(res.code==1){
        let arr = []
        if (type == 0) {
          arr = res.data.list
        } else {
          arr = _this.data.list
          for (let i in res.data.list) {
            arr.push(res.data.list[i])
          }
        }
        _this.setData({
          list:arr,
          total:res.data.total
        })
      }
    })
  },
  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMsg(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.total > this.data.list.length){
      this.getMsg(1)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})