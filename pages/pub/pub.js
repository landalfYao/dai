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
    props:[
      {name:'name',msg:'请填写姓名'},
      { name: 'idcard', msg: '请填写身份证号码' },
      { name: 'phone', msg: '请填写手机号' },
      { name: 'position', msg: '请填写职业' },
      { name: 'city', msg: '请填写工作城市' }, 
      { name: 'gjj', msg: '请选择是否有本地公积金' },
      { name: 'sb', msg: '请选择是否有本地社保' },
      { name: 'housetype', msg: '请选择房产类型' },
      { name: 'zxqk', msg: '请选择装修情况' },
      { name: 'area', msg: '请填写面积' },
      { name: 'hcar', msg: '请选择是否有车' },
      { name: 'xyqk', msg: '请选择信用情况' },
      { name: 'money', msg: '请填写贷款金额' },
      { name: 'date', msg: '请填写贷款期限' },
    ],
    htflag:0,
    gjj:['有','无'],
    houseType: ['有房，但不确认房产类型','无房产','小产权房', '经适/限价房', '房改/危改房', '商铺','厂房','商住两用房','办公楼','军产房','商品住房','宅基地/自建房'],
    zx:['毛坯','简装修','精装修','豪华装修'],
    xy: ['信用良好，无逾期', '无信用卡或贷款', '1年内逾期超过3次或超过90天','1年内逾期少于3次或少于90天']
  },
  submit(){
    let props = this.data.props
    let formData = this.data.formData
    let temp = -1
    for(let i in props){
      if(formData[props[i].name]==''){
        temp = i
        break;
      }
    }
    if(temp == -1){
      wx.showLoading({
        title: '提交中',
      })
      formData.wx_id = wx.getStorageSync("user").id
      app.com.post('order/add',formData,function(res){
        wx.hideLoading()
        if(res.code == 1){
          wx.showToast({
            title: '提交成功'
          })
        }
      })
    }else{
      wx.showToast({
        title: props[temp].msg,
        icon:'none'
      })
    }
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