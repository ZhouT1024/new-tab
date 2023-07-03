// 初始化设置
chrome.storage.sync.get(['urlFrom'], function (result) {
  let urlFrom = result.urlFrom
  if (!urlFrom) {
    urlFrom = 'defaultOptions'
    // 设置不存在
    chrome.storage.sync.set({
      urlFrom,
      defaultOptions: 'https://cn.bing.com/',
    })
  }
})
