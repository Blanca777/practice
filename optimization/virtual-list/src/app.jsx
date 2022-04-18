import { useCallback, useRef, useState, useMemo } from 'react'
import createData from './data'
import './app.css'

// 滚动窗口的高度
const SCROLL_VIEW_HEIGHT = 500
// 每一项的高度
const ITEM_HEIGHT = 50
// 加载的数量
const PRE_LOAD_COUNT = SCROLL_VIEW_HEIGHT / ITEM_HEIGHT
const App = () => {
  const containRef = useRef(null)

  const [sourceData] = useState(() => {
    return createData()
  })
  const [showRange, setShowRange] = useState({
    startIdx: 0,
    endIdx: 10
  })
  const scrollViewHeight = useMemo(() => {
    return sourceData.length * ITEM_HEIGHT
  }, [sourceData])
  const currentList = useMemo(() => {
    return sourceData.slice(showRange.startIdx, showRange.endIdx)
  })
  const scrollEvent = useCallback((evt) => {})
  return (
    <div
      className="vlist-container"
      style={{ height: SCROLL_VIEW_HEIGHT }}
      ref={containRef}
      onScroll={scrollEvent}
    >
      <div className="v-phantom" style={{ height: scrollViewHeight }}>
        {currentList.map((data) => {
          return (
            <div
              className="v-item"
              key={data}
              style={{
                height: ITEM_HEIGHT - 1,
                lineHeight: ITEM_HEIGHT + 'px'
              }}
            >
              Current Position: {data}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
