// 初始化设置
chrome.storage.sync.get(['urlFrom'], function (result) {
  let urlFrom = result.urlFrom
  if (!urlFrom) {
    urlFrom = 'default'
    // 设置不存在
    chrome.storage.sync.set({
      urlFrom,
      default: 'https://cn.bing.com/',
    })
  }
})
