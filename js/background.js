// 初始化新标签页
chrome.storage.sync.get(['homeUrl'], function (result) {
  let homeUrl = result.homeUrl

  if (homeUrl === undefined) {
    homeUrl = 'https://cn.bing.com/'
    chrome.storage.sync.set({ homeUrl }, () => {
      console.log('homeUrl is set to ' + homeUrl)
    })
  }
})
