const app = getApp()
let _this = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      name:'',
      idcard:'',
      phone:'',
      position:'',
      city:'',
      gjj:'',//公积金
      sb:'',//社保
      housetype:'',//房产类型
      zxqk:'',//装修情况
      area:'',
      hcar:'',//是否有车
      xyqk:'',//信用情况
      money:'',
      date:''
    },
    htflag:0,
    gjj:['有','无'],
    houseType: ['有房，但不确认房产类型','无房产','小产权房', '经适/限价房', '房改/危改房', '商铺','厂房','商住两用房','办公楼','军产房','商品住房','宅基地/自建房'],
    zx:['毛坯','简装修','精装修','豪华装修'],
    xy: ['信用良好，无逾期', '无信用卡或贷款', '1年内逾期超过3次或超过90天','1年内逾期少于3次或少于90天']
  },
  actionSheet(arr,cb){
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        cb(arr[res.tapIndex])
      },
      fail(res) {
       
      }
    })
  },
  gjjclick(){
    this.actionSheet(this.data.gjj,function(res){
      _this.setData({
        'formData.gjj': res
      })
    })
  },
  sbclick(){
    this.actionSheet(this.data.gjj, function (res) {
      _this.setData({
        'formData.sb': res
      })
    })
  },
  htclick(e){
    
      _this.setData({
        'formData.housetype': this.data.houseType[e.detail.value],
        htfalg:e.detail.value
      })
    
  },
  zxclick() {
    this.actionSheet(this.data.zx, function (res) {
      _this.setData({
        'formData.zxqk': res
      })
    })
  },
  carclick() {
    this.actionSheet(this.data.gjj, function (res) {
      _this.setData({
        'formData.hcar': res
      })
    })
  },
  xyclick(){
    this.actionSheet(this.data.xy, function (res) {
      _this.setData({
        'formData.xyqk': res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})