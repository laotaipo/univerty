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
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toast: function () {
      wx.navigateTo({
        url: '../../pages/my/my'
      })
    },
    showMore: function() {
      this.setData({
        show: !this.data.show
      })
      console.log(this.data.show)
    },
    find: function(e) {
      let tag = e.currentTarget.dataset.tag
      wx.navigateTo({
        url: `../../pages/sort/sort?tag=${tag}`
      })      
    },
    goSort: function(e) {
      let tag = e.currentTarget.dataset.tag
      console.log(tag)
      if(tag == "1" || tag == 1) {
        wx.navigateTo({
          url: `../../pages/dong/dong`
        })  
      } else {
        wx.navigateTo({
          url: `../../pages/sort/sort?tag=${tag}`
        })   
      }
        
    },
    goNew: function(e) {
      let tag = e.currentTarget.dataset.tag
      wx.navigateTo({
        url: '../../pages/index/index'
      })     
    }
  }
})
