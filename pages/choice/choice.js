// pages/choice/choice.js
const a = 1;
console.log(a);
let data = require("../../data")
// console.log(data);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dong: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const dong = data.choice
    this.setData({
      dong: dong
    })
    console.log('jjjj')
    console.log(dong)
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