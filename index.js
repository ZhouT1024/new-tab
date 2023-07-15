let homeUrl = ''
chrome.storage.sync.get(['customMode']).then(result => {
  const { customMode } = result

  chrome.storage.sync.get([customMode], function (result) {
    const homeUrl = result[customMode]
    window.location.replace(homeUrl)
  })
})
