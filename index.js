/**
 * 获取新标签页地址
 *
 * @returns {String} 新标签页url地址
 */
function getHomeUrl() {
  let homeUrl = localStorage.getItem('homeUrl')

  if (!homeUrl) {
    homeUrl = 'https://cn.bing.com/'
    localStorage.setItem('homeUrl', homeUrl)
  }
  return homeUrl
}

window.location.href = getHomeUrl()
