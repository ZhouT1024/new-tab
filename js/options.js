const defaultOptions = [
  { name: '必应', url: 'https://cn.bing.com/', selected: true },
  { name: '百度', url: 'https://www.baidu.com/' },
  { name: '搜狗', url: 'https://www.sogou.com/' },
  { name: '360', url: 'https://www.so.com/' },
]

const select = document.querySelector('select.url')
const radioGroup = document.querySelector('.radio-group')
const defaultRadioOption = document.querySelector('.radio-option.default')
const customRadioOption = document.querySelector('.radio-option.custom')
const urlInput = document.querySelector('input.url')
const saveBtn = document.querySelector('.save.btn')

// 初始化下拉选择框
select.innerHTML = defaultOptions.map(option => {
  return `
  <option value="${option.url}" ${option.selected ? 'selected' : ''}>
    ${option.name}
  </option>`
}).join('')

// 初始化选择的方式
chrome.storage.sync.get(['urlFrom', 'homeUrl'], function (result) {
  let { urlFrom: from, homeUrl } = result

  const checkedRadioOption = document.querySelector(`.radio-option.${from}`)
  checkedRadioOption.classList.add('checked')
  checkedRadioOption.querySelector('input[type="radio"]').setAttribute('checked', true)
  const urlDom = checkedRadioOption.querySelector('.url')
  if (urlDom.tagName.toLowerCase() === 'select') {
    urlDom.value = homeUrl
  } else if (urlDom.tagName.toLowerCase() === 'input') {
    urlDom.value = homeUrl
  }
});

// 用户选择设置新标签的方式：使用默认提供的选项；自己输入url
radioGroup.addEventListener('click', e => {
  const tag = e.target
  if (tag.tagName.toLowerCase() !== 'input') return
  if (tag.type !== 'radio') return

  const radioValue = tag.value
  const radioOption = document.querySelector('.radio-option.checked')
  if (radioOption) radioOption.classList.remove('checked')
  if (radioValue === 'default') {
    // 使用默认选项
    defaultRadioOption.classList.add('checked')
    select.removeAttribute('disabled')
    urlInput.setAttribute('disabled', true)
  } else {
    // 自定义
    customRadioOption.classList.add('checked') // 自定义url: 禁用默认下拉框
    urlInput.removeAttribute('disabled')
    select.setAttribute('disabled', true)
  }
})

// TODO 保存新标签url
saveBtn.addEventListener('click', e => {
  const url = document.querySelector('.radio-option.checked .url').value
  const from = document.querySelector('.radio-option.checked input[type="radio"]').value
  console.log('url: ', url)
  if (!url) return
  chrome.storage.sync.set({ homeUrl: url, urlFrom: from }, function () {
    console.log('Url is set to ' + url);
  });
})
