let homeUrl = ''
chrome.storage.sync.get(['urlFrom']).then(result => {
  const { urlFrom } = result

  chrome.storage.sync.get([urlFrom], function (result) {
    const homeUrl = result[urlFrom]
    window.location.href = homeUrl
  })
})
