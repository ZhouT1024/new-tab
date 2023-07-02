// 初始化新标签页
chrome.storage.sync.get(['homeUrl', 'urlFrom'], function (result) {
  let { homeUrl, urlFrom } = result

  if (homeUrl === undefined) {
    homeUrl = 'https://cn.bing.com/'
    chrome.storage.sync.set({ homeUrl }, () => {
      console.log('homeUrl is set to ' + homeUrl)
    })
  }
  if (urlFrom === undefined) {
    urlFrom = 'default'
    chrome.storage.sync.set({ urlFrom })
  }
})
