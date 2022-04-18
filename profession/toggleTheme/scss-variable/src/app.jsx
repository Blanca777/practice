import { useCallback, useState } from 'react'
import './index.scss'
const App = () => {
  // 定义切换按钮的文案，并且给html附上默认主题类型
  const [themeText, setThemeText] = useState(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    return 'light'
  })
  // 切换逻辑
  const toggleTheme = useCallback(() => {
    if (themeText === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark')
      setThemeText('dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      setThemeText('light')
    }
  })
  return (
    <div className="content">
      <button onClick={toggleTheme}>{themeText}</button>
      <h1>SCSS variable</h1>
      <p>abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <button>button</button>
    </div>
  )
}

export default App
