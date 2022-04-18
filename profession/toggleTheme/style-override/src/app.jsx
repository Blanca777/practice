import { useCallback, useEffect, useState } from 'react'
import generateColors from './color'

const App = () => {
  const [styleTemplate, setStyleTemplate] = useState('')
  const originalStylesheetCount = document.styleSheets.length
  useEffect(() => {
    const colorMap = {
      '#fff': 'bgColor0',
      '#fff': 'bgColor1',
      '#333': 'textColor',
      '#1c1f23': 'grey1'
    }
    fetch('https://assets.asaki-m.com/template.css')
      .then((r) => r.text())
      .then((data) => {
        let dataText = data
        // 遍历颜色映射表将颜色转换成关键字
        Object.keys(colorMap).forEach((key) => {
          const value = colorMap[key]
          dataText = dataText.replace(new RegExp(key, 'ig'), value)
        })
        // 转换完后设置到变量保存模板
        setStyleTemplate(dataText)
      })
  }, [])
  const toggleTheme = useCallback((evt) => {
    let cssText = styleTemplate
    // 通过input color选择完颜色后，生成关键字与颜色对应的映射
    let colors = generateColors(evt.target.value)
    // 遍历映射表重新将关键字替换成rgb颜色
    Object.keys(colors).forEach((key) => {
      cssText = cssText.replace(
        new RegExp('(:|\\s+)' + key, 'g'),
        '$1' + colors[key]
      )
    })
    // 判断是否已经存在了style标签，不存在就创建一个，存在就直接覆盖里面的内容
    if (originalStylesheetCount === document.styleSheets.length) {
      const style = document.createElement('style')
      style.innerText = cssText
      document.head.appendChild(style)
    } else {
      document.head.lastChild.innerText = cssText
    }
  })
  return (
    <div className="content">
      <input type="color" onChange={toggleTheme} />
      <h1>CSS variable</h1>
      <p>abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <button>button</button>
    </div>
  )
}

export default App
