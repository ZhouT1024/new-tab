// dom
const form = document.querySelector('form')
const select = document.querySelector('select.url')
const urlInput = document.querySelector('input.url')
const saveBtn = document.querySelector('.save.btn')
const resetBtn = document.querySelector('.reset.btn')

const bingName = chrome.i18n.getMessage('Bing')
const googleName = chrome.i18n.getMessage('Google')
const baiduName = chrome.i18n.getMessage('baidu')
const sogouName = chrome.i18n.getMessage('sogou')
const soName = chrome.i18n.getMessage('so')
const saveName = chrome.i18n.getMessage('save')

saveBtn.innerText = saveName

const defaultOptions = [
  { name: bingName, url: 'https://cn.bing.com/' },
  { name: googleName, url: 'https://www.google.com/' },
  { name: baiduName, url: 'https://www.baidu.com/' },
  { name: sogouName, url: 'https://www.sogou.com/' },
  { name: soName, url: 'https://www.so.com/' },
]

/**
 * 国际化
 */
function i18nInit() {
  const defaultOptionsLabel = document.querySelector('.form-item fieldset.defaultOptions .label-text')
  const customUrlLabel = document.querySelector('.form-item fieldset.custom .label-text')

  defaultOptionsLabel.innerText = chrome.i18n.getMessage('labelDefaultOptions')
  customUrlLabel.innerText = chrome.i18n.getMessage('labelCustomUrl')
}


/**
 * 改变设置方式
 * @param {string} setMode 设置方式
 */
function changeMode(setMode) {
  const disabledItem = document.querySelector('fieldset.checked')
  if (disabledItem) {
    disabledItem.classList.remove('checked')
    disabledItem.setAttribute('disabled', 'disabled')
  }

  const fieldset = document.querySelector(`fieldset.${setMode}`)
  fieldset.classList.add('checked')
  fieldset.removeAttribute('disabled')
}

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

i18nInit()

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
// TODO 设置初始禁用状态
chrome.storage.sync.get(['customMode', 'defaultOptions', 'custom'], function (result) {
  let { customMode, defaultOptions, custom } = result

  if (custom) urlInput.value = custom
  select.value = defaultOptions

  const radio = document.querySelector(`input.${customMode}[type="radio"][name="custom-mode"]`)  
  radio.setAttribute('checked', 'checked')
  changeMode(customMode)
})

// 用户选择设置新标签的方式：使用默认提供的选项；自己输入url
form.addEventListener('click', e => {
  const tag = e.target
  
  if (tag.localName !== 'input') return
  if (tag.getAttribute('type') !== 'radio') return 
  
  // console.log(tag)
  const setMode = tag.value
  console.log('设置方式: ', setMode)
  
  // TODO 设置取消选中的禁用
  changeMode(setMode)
})

// 保存新标签url
saveBtn.addEventListener('click', e => {
  const customMode = document.querySelector('input[name="custom-mode"]:checked').value
  const homePage = customMode === 'defaultOptions' ? select.value : urlInput.value

  console.log('homePage: ' + homePage)
  const regex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi
  if (!homePage || !regex.test(homePage)) {
    console.log('url无效')
    alert('url无效')
    return
  }

  chrome.storage.sync.set({ customMode, [`${customMode}`]: homePage }).then(res => {
    console.log('保存成功')
    window.location.href = homePage
  })
})
