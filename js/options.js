const defaultOptions = [
  { name: '必应', url: 'https://cn.bing.com/', selected: true },
  { name: '百度', url: 'https://www.baidu.com/' },
  { name: '搜狗', url: 'https://www.sogou.com/' },
  { name: '360', url: 'https://www.so.com/' },
]

const form = document.querySelector('.form')
const selector = document.querySelector('.select')
const selectorDisplay = selector.querySelector('.select-display')
const selectorValue = selector.querySelector('.select-value')
const selectorOptions = selector.querySelector('.select-options')

const submitBtn = document.querySelector('.btn.form-btn')

function initialize() {
  // 加载选择器选项
  defaultOptions.forEach(opt => {
    const { name, url, selected = false } = opt
    if (selected) selectorDisplay.value = name
    selectorOptions.innerHTML += `<li class="option 
      ${selected ? 'selected' : ''}" data-url="${url}">
        ${name}
    </li>`
  })

  // TODO: 初始化自定义类型（从storage中获取，如果没有设置默认值）
  document.querySelector('.form-item').classList.add('checked')
  document
    .querySelector('input[name="source"]')
    .setAttribute('checked', 'checked')
}

/**
 * 保存设置
 */
function saveSettings() {
  // TODO: 保存自定义方式
  // TODO: 保存新标签页url
}

initialize()

// 选择器聚焦
selectorDisplay.addEventListener('focus', e => {
  selector.classList.add('focus')

  // 监听页面上的点击事件
  setTimeout(() => {
    document.addEventListener(
      'click',
      e => {
        const tag = e.target

        // 修改选中的值
        if (tag.classList.contains('option')) {
          const text = tag.innerText

          document.querySelector('.selected').classList.remove('selected')
          selectorDisplay.value = text
          tag.classList.add('selected')
        }

        selector.classList.remove('focus')
      },
      { once: true }
    )
  }, 200)
})

// TODO 选择自定义方式
form.addEventListener('click', e => {
  const tag = e.target
  const { localName, name, type, id } = tag

  if (localName !== 'input') return false
  if (name !== 'source') return false
  if (type !== 'radio') return false

  console.log('tag.id: ', id)
  document.querySelector('.form-item.checked').classList.remove('checked')

  tag.parentElement.classList.add('checked')
  // TODO: 禁用
})

submitBtn.addEventListener('click', e => {
  console.log('save settings')
  // TODO 保存设置

  // TODO 离开当前页面
})
