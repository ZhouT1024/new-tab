// 初始化设置
chrome.storage.sync.get(['customMode'], function (result) {
  let customMode = result.customMode
  if (!customMode) {
    customMode = 'defaultOptions'
    // 设置不存在
    chrome.storage.sync.set({
      customMode,
      defaultOptions: 'https://cn.bing.com/',
    })
  }
})
