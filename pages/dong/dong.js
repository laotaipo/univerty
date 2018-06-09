// pages/dong/dong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `http://${HOST}:3000/users/news`,
      method: 'post',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: data,
      // method: 'POST',
      success: function (res) {
        console.log('00000000')
        res.data.map((item) => {
          item.createTime = util.formatTime(new Date(item.createTime))
        })
        let arr = res.data
        arr.map((item) => {
          item.tempFilePaths = item.tempFilePaths.split(",")
        })
        that.setData({
          newsList: arr
        })
        console.log(res.data)
      }
    })
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