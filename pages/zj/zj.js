const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize:10,
    pageIndex:1,
    wheres:'is_show=1 and is_delete=0',
    sorts:'sort asc',
    list:[],
    total:0
  },
  navto(e){
    if (!wx.getStorageSync("user").phone) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/pubt/pubt?title=' + e.currentTarget.dataset.title,
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.setData({
      showPage: wx.getStorageSync("user").showPage,
      des: wx.getStorageSync("user").des || ''
    })
    this.getList(0)
  },
  getList(type){
    if(type == 0){
      this.data.pageIndex = 1
    }else{
      this.data.pageIndex += 1
    }
    wx.showLoading({
      title: '加载中',
    })
    app.com.post('bank/get',{
      wheres:this.data.wheres,
      pageIndex:this.data.pageIndex,
      pageSize:this.data.pageSize,
      sorts: this.data.sorts
    },function(res){
      wx.stopPullDownRefresh()
      wx.hideLoading()
      if(res.code == 1){
        let arr = []
        if(type == 0){
          arr = res.data.list
        }else{
          arr = _this.data.list
          for(let i in res.data.list){
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
  onPullDownRefresh(){
    this.getList(0)
  },
  onReachBottom(){
    if(this.data.list.length < this.data.total){
      this.getList(1)
    }
  }

})