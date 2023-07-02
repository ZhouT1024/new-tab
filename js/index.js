let homeUrl = ''
chrome.storage.sync.get(['homeUrl']).then(result => {
  homeUrl = result.homeUrl
  window.location.href = homeUrl
})
