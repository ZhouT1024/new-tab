/**
 * 获取新标签页地址
 *
 * @returns {String} 新标签页url地址
 */
function getHomeUrl() {
  let homeUrl = ''
  chrome.storage.sync.get(['homeUrl'], function (result) {
    homeUrl = result.homeUrl
  })

  if (!homeUrl) {
    homeUrl = 'https://cn.bing.com/'
    chrome.storage.sync.set({ homeUrl })
  }
  return homeUrl
}

window.location.href = getHomeUrl()
