// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toast: function () {
      wx.navigateTo({
        url: '../../pages/my/my'
      })
    }
  }
})
