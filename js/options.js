const defaultOptions = [
  { name: '必应', url: 'https://cn.bing.com/' },
  { name: '百度', url: 'https://www.baidu.com/' },
  { name: '搜狗', url: 'https://www.sogou.com/' },
  { name: '360', url: 'https://www.so.com/' },
]

// dom
const select = document.querySelector('select.url')
const urlInput = document.querySelector('input.url')
const radioGroup = document.querySelector('.radio-group')
const defaultRadioOption = document.querySelector('.radio-option.defaultOptions')
const customRadioOption = document.querySelector('.radio-option.custom')
const saveBtn = document.querySelector('.save.btn')
const resetBtn = document.querySelector('.reset.btn')

/**
 * 使用自定义url
 */
function enableCustomUrl() {
  customRadioOption.classList.add('checked') // 自定义url: 禁用默认下拉框
  urlInput.removeAttribute('disabled')
  select.setAttribute('disabled', true)
}

/**
 * 使用默认提供的选项
 */
function enableDefaultOptions() {
  defaultRadioOption.classList.add('checked')
  select.removeAttribute('disabled')
  urlInput.setAttribute('disabled', true)
}

// 初始化下拉选择框
select.innerHTML = defaultOptions
  .map(option => {
    return `
  <option value="${option.url}">
    ${option.name}
  </option>`
  })
  .join('')

// 初始化选择的方式
chrome.storage.sync.get(['urlFrom', 'defaultOptions', 'custom'], function (result) {
  let { urlFrom, defaultOptions, custom } = result

  if (custom) urlInput.value = custom
  select.value = defaultOptions

  if (urlFrom === 'defaultOptions') {
    defaultRadioOption.querySelector('input[type="radio"').setAttribute('checked', 'true')
    enableDefaultOptions()
  } else {
    customRadioOption.querySelector('input[type="radio"]').setAttribute('checked', 'true')
    enableCustomUrl()
  }
})

// 用户选择设置新标签的方式：使用默认提供的选项；自己输入url
radioGroup.addEventListener('click', e => {
  const tag = e.target
  if (tag.tagName.toLowerCase() !== 'input') return
  if (tag.type !== 'radio') return

  const radioValue = tag.value
  const radioOption = document.querySelector('.radio-option.checked')
  if (radioOption) radioOption.classList.remove('checked')
  if (radioValue === 'defaultOptions') {
    // 使用默认选项
    enableDefaultOptions()
  } else {
    // 自定义
    enableCustomUrl()
  }
})

// 保存新标签url
saveBtn.addEventListener('click', e => {
  const urlFrom = document.querySelector('input[name="url-from"]:checked').value
  const homePage = urlFrom === 'defaultOptions' ? select.value : urlInput.value

  console.log('homePage: ' + homePage)
  const regex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi
  if (!homePage || !regex.test(homePage)) {
    console.log('url无效')
    alert('url无效')
    return
  }

  chrome.storage.sync.set({ urlFrom, [`${urlFrom}`]: homePage }).then(res => {
    console.log('保存成功')
    window.location.href = homePage
  })
})
// 重置设置
// 设置为defaultOptions 必应
// resetBtn.addEventListener('click', e => {
//   const bingHomepage = 'https://cn.bing.com/'
//   const task = chrome.storage.sync.set({ urlFrom: 'defaultOptions', defaultOptions: bingHomepage, custom: '' })
//   task.then(res => {
//     // 重置成功
//     defaultRadioOption.querySelector('input[type="radio"]').setAttribute('checked', true)
//     select.value = bingHomepage
//     enableDefaultOptions()
//   })
// })
