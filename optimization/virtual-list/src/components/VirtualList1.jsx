import { useCallback, useRef, useState, useMemo } from 'react'
import createData from '../data'
import '../app.css'

// 滚动窗口的高度
const SCROLL_VIEW_HEIGHT = 500
// 每一项的高度
const ITEM_HEIGHT = 50
// 可视区域内展示的数量
const limit = SCROLL_VIEW_HEIGHT / ITEM_HEIGHT

const VirtualList1 = () => {
  const containRef = useRef(null)

  // 获取长列表数据
  const [sourceData] = useState(() => {
    return createData()
  })

  // 定义展示区域的startIdx， endIdx
  const [idxConfig, setIdxConfig] = useState({
    startIdx: 0,
    endIdx: limit
  })

  // 计算列表总高度，用以生成滚动条
  const scrollViewHeight = useMemo(() => {
    return sourceData.length * ITEM_HEIGHT
  }, [sourceData])

  // 滚动事件
  const scrollEvent = useCallback((evt) => {
    if (evt.target !== containRef.current) return
    const { scrollTop } = evt.target
    // 获取当前索引，滚动的距离 / itemHeight可以算出滚动了几个item的距离
    const currentIdx = Math.floor(scrollTop / ITEM_HEIGHT)
    // 判断当前索引和startIdx一不一样
    if (currentIdx !== idxConfig.startIdx) {
      // 不一样更新索引
      setIdxConfig({
        startIdx: currentIdx,
        // 处理滚到底后，endIdx超出数组边界
        endIdx: Math.min(currentIdx + limit, sourceData.length - 1)
      })
    }
  })

  // 渲染数据函数
  const renderContent = useCallback(() => {
    const renderItem = ({ item, style }) => {
      return (
        <div
          className="v-item"
          key={parseInt(Math.random() * Date.now()).toString()}
          style={style}
        >
          current positions - {item}
        </div>
      )
    }

    const content = []
    for (let i = idxConfig.startIdx; i <= idxConfig.endIdx; ++i) {
      content.push(
        renderItem({
          item: sourceData[i],
          style: {
            height: ITEM_HEIGHT - 1,
            lineHeight: ITEM_HEIGHT + 'px',
            top: i * ITEM_HEIGHT + 'px'
          }
        })
      )
    }
    return content
  })
  return (
    <div
      className="vlist-container"
      style={{ height: SCROLL_VIEW_HEIGHT }}
      ref={containRef}
      onScroll={scrollEvent}
    >
      <div className="v-phantom" style={{ height: scrollViewHeight }}>
        {renderContent()}
      </div>
    </div>
  )
}

export default VirtualList1
